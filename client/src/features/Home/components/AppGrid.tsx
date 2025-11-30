import { useEffect, useState } from "react";
import AppCard from "./AppCard";
import { AnimatePresence, motion } from "framer-motion";
import { HiStar, HiCursorClick, HiOutlineBookmark, HiBookmark } from "react-icons/hi";
import { RiChatSmile2Line } from "react-icons/ri";
import { Link } from "@tanstack/react-router";
import ReviewsSection from "./ReviewsSection";
import ReviewModal from "../../Preview/components/ReviewModal";
import api from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useToast } from "../../../contexts/ToastContext";

interface AppGridProps {
  activeView?: "Following" | "Discover";
  selectedCategory?: string;
  activeTab: string;
}

const AppGrid = ({
  activeView = "Discover",
  selectedCategory = "All",
  activeTab,
}: AppGridProps) => {
  const { user: authUser } = useAuth();
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProjectForReview, setSelectedProjectForReview] =
    useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalTab, setModalTab] = useState<'preview' | 'code'>('preview');
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>([]);

  // Reset modal tab when modal opens/closes
  useEffect(() => {
    setModalTab('preview');
  }, [selectedApp]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        if (activeView === "Discover") {
          // Fetch all projects
          const response = await api.get("/api/projects");
          setProjects(response.data.projects || []);
        } else {
          // Fetch projects from followed users
          // TODO: Implement following system
          // For now, show empty or all projects
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    fetchProjects();
  }, [activeView]);

  useEffect(() => {
    const fetchSavedProjects = async () => {
      if (authUser) {
        try {
          const userId = authUser.id || (authUser as any)._id;
          const response = await api.get(`/api/projects/saved/${userId}`);
          setSavedProjectIds(response.data.map((p: any) => p._id));
        } catch (error) {
          console.error("Error fetching saved projects:", error);
        }
      }
    };
    fetchSavedProjects();
  }, [authUser]);

  useEffect(() => {
    if (selectedApp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedApp]);

  // Map backend projects to frontend format
  const apps = projects.map((project) => ({
    id: project._id,
    title: project.title,
    description: project.tagline,
    image: project.images?.[0] || "https://via.placeholder.com/800x600",
    icon:
      project.logo ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}`,
    badge: undefined,
    hasVideo: false,
    category: project.categories?.[0] || "Other",
    type: project.type,
    submissionType: project.submissionType,
    link: project.link,
    isLocked: false,
    author: project.author, // Include author data
    averageRating: project.averageRating || 0,
    reviewsCount: project.reviewsCount || 0,
    reviews: project.reviews || [],
    createdAt: project.createdAt,
    codeSnippet: project.codeSnippet,
    isBookmarked: savedProjectIds.includes(project._id),
  }));

  const filteredApps = apps
    // filter by TAB
    .filter((app) => {
      if (activeTab === "All") return true;
      if (activeTab === "Projects") return app.type === "project";
      if (activeTab === "Screens") return app.type === "screens";
      if (activeTab === "UI Elements") return app.type === "ui_element";
      if (activeTab === "Themes") return app.type === "theme";
      return true;
    })

    // SORT based on dropdown
    .sort((a, b) => {
      if (selectedCategory === "Latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (selectedCategory === "Most popular") {
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      if (selectedCategory === "Top rated") {
        return (b.averageRating || 0) - (a.averageRating || 0);
      }
      return 0;
    });

  const handleReviewClick = (app: any) => {
    setSelectedProjectForReview(app);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (data: { ux: number; ui: number; review: string }) => {
    if (!authUser || !selectedProjectForReview) return;

    const userId = authUser.id || (authUser as any)._id;
    const rating = (data.ux + data.ui) / 2;

    try {
      await api.post(`/api/projects/${selectedProjectForReview.id}/reviews`, {
        userId,
        rating,
        comment: data.review
      });

      alert('Review submitted successfully!');
      setReviewModalOpen(false);
      setSelectedProjectForReview(null);

      // Refresh projects to show new rating
      // Ideally we should refactor fetchProjects to be callable here
      // For now, let's just update local state if possible or reload
      window.location.reload();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const { showToast } = useToast();

  const handleBookmarkProject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!authUser) {
      showToast('Please sign in to bookmark projects', 'info');
      return;
    }

    const userId = authUser.id || (authUser as any)._id;
    const isBookmarked = savedProjectIds.includes(id);

    // Optimistic Update
    if (isBookmarked) {
      setSavedProjectIds(prev => prev.filter(pid => pid !== id));
    } else {
      setSavedProjectIds(prev => [...prev, id]);
    }

    try {
      if (isBookmarked) {
        await api.delete(`/api/projects/${id}/save`, { data: { userId } });
      } else {
        await api.post(`/api/projects/${id}/save`, { userId });
      }
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);

      // Revert Optimistic Update
      if (isBookmarked) {
        setSavedProjectIds(prev => [...prev, id]);
      } else {
        setSavedProjectIds(prev => prev.filter(pid => pid !== id));
      }

      showToast('Failed to update bookmark', 'error', {
        label: 'Report Issue',
        onClick: () => window.open('mailto:support@appgrade.com?subject=Bookmark%20Error', '_blank')
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mainColor"></div>
      </div>
    );
  }

  if (filteredApps.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-20 text-textColorWeak">
        <p className="text-lg">No projects found</p>
        {activeView === "Following" && (
          <p className="text-sm mt-2">
            Follow some creators to see their projects here
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pb-10">
        {filteredApps.map((app) => (
          <div key={app.id} onClick={() => setSelectedApp(app)}>
            <AppCard {...app} onReview={() => handleReviewClick(app)} />
          </div>
        ))}
      </div>

      {/* App Details Modal */}
      <AnimatePresence mode="wait">
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.32,
                ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier, no bounce
              }}
              className="w-full max-w-[84%] max-lg:max-w-full mx-auto h-[calc(100svh-56px)] overflow-y-auto bg-modalBg rounded-t-3xl shadow-xl fixed top-14 left-0 right-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col max-w-[88%] mx-auto pb-10 max-lg:pb-6">
                <div className="w-full sticky top-0 z-10 bg-modalBg px-10 pt-8 max-xl:px-10 max-lg:pt-6 max-lg:px-0  flex items-start justify-between max-md:flex-col max-md:items-start gap-3 max-md:gap-0">
                  <div className="flex gap-4 items-start mb-6 min-w-fit">
                    <img
                      src={selectedApp.icon}
                      className="w-14 h-14 rounded-2xl"
                      alt={selectedApp.title}
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-textColor">
                        {selectedApp.title}{" "}
                        {selectedApp.type && selectedApp.type !== "project" && (
                          <span className="text-textColorWeak">
                            (
                            {selectedApp.type === "ui_element"
                              ? "UI Element"
                              : selectedApp.type === "screens"
                                ? "Screen"
                                : "Theme"}
                            )
                          </span>
                        )}
                      </h2>
                      <p className="text-textColor">
                        {selectedApp.description}
                      </p>
                      <div className="flex items-start justify-start gap-2 flex-wrap mt-3">
                        <p className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">
                          UI/UX
                        </p>
                        <p className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">
                          Design Work
                        </p>
                        <p className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">
                          No Backend
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-end gap-6 pt-3 max-md:pt-0 max-sm:gap-3 max-md:flex-row-reverse">
                    <div className="border-r pr-6 max-md:border-r-[0] mr-0 border-linesColor h-[48px] flex items-center flex-col max-sm:items-end ">
                      <h1 className="flex items-center text-xl font-semibold gap-1">
                        <HiStar className="text-2xl text-orange-500 dark:text-orange-400 " />
                        {selectedApp.averageRating || 0}
                      </h1>
                      <p className="text-sm font-medium text-textColorWeak">
                        ({selectedApp.reviewsCount || 0}<span className="max-sm:hidden"> Reviews</span>)
                      </p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      animate={{ scale: selectedApp.isBookmarked ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => handleBookmarkProject(e, selectedApp.id)}
                      className={`h-[48px] aspect-square flex items-center justify-center text-2xl rounded-full transition-colors ${selectedApp.isBookmarked ? 'bg-mainColor text-white' : 'bg-cardItemBg text-textColor hover:bg-cardItemBgHover'}`}
                    >
                      {selectedApp.isBookmarked ? <HiBookmark /> : <HiOutlineBookmark />}
                    </motion.button>
                    {selectedApp.type === "project" ||
                      selectedApp.submissionType === "developed" ? (
                      <Link
                        to="/preview/$projectId"
                        params={{ projectId: selectedApp.id.toString() }}
                        className="text-left text-white h-[48px] max-md:flex-1 max-md:justify-center bg-mainColor pl-4 pr-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                      >
                        <HiCursorClick className="text-xl" />
                        Start Testing
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleReviewClick(selectedApp)}
                        className="text-left text-white h-[48px] max-md:flex-1 max-md:justify-center bg-mainColor pl-4 pr-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                      >
                        <RiChatSmile2Line className="text-xl" />
                        Review
                      </button>
                    )}
                  </div>
                </div>

                <div className="px-10 max-xl:px-10 max-lg:px-0">
                  {/* Preview/Code Tabs for UI Elements and Themes only */}
                  {(selectedApp.type === "ui_element" || selectedApp.type === "theme") && (
                    <div className="flex items-center gap-4 mb-6 border-b border-linesColor">
                      <button
                        onClick={() => setModalTab('preview')}
                        className={`px-4 py-3 font-medium transition-colors border-b-2 ${modalTab === 'preview'
                          ? 'text-mainColor border-mainColor'
                          : 'text-textColorWeak border-transparent hover:text-textColor'
                          }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setModalTab('code')}
                        className={`px-4 py-3 font-medium transition-colors border-b-2 ${modalTab === 'code'
                          ? 'text-mainColor border-mainColor'
                          : 'text-textColorWeak border-transparent hover:text-textColor'
                          }`}
                      >
                        Code
                      </button>
                    </div>
                  )}

                  {/* Preview Tab Content */}
                  {modalTab === 'preview' && selectedApp.image && (
                    <img
                      src={selectedApp.image}
                      className="w-full rounded-2xl mt-6 shadow-2xl"
                      alt={selectedApp.title}
                    />
                  )}

                  {/* Code Tab Content */}
                  {modalTab === 'code' && (
                    <div className="mt-6">
                      <div className="bg-cardBg rounded-2xl p-6 border border-linesColor">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-textColor">Code</h3>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(selectedApp.codeSnippet || '// No code available');
                            }}
                            className="px-3 py-1.5 text-sm bg-mainColor text-white rounded-lg hover:bg-mainColorHover transition-colors"
                          >
                            Copy Code
                          </button>
                        </div>
                        <pre className="bg-bodyBg rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-textColor font-mono">
                            {selectedApp.codeSnippet || '// No code snippet available for this project'}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Author Section */}
                  <div className="w-full border-t border-linesColor mt-20 max-md:mt-14 pb-10 flex items-center justify-center flex-col gap-1.5 max-w-[90%] mx-auto">
                    <div className="size-20 max-md:size-14 -mt-11 max-md:-mt-8 ring-[10px] ring-modalBg rounded-full bg-cardBg shadow-md mb-2.5 overflow-hidden cursor-pointer">
                      <img
                        src={
                          selectedApp.author?.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedApp.author?.name || "User")}`
                        }
                        className="w-full h-full object-cover"
                        alt={selectedApp.author?.name || "User"}
                      />
                    </div>
                    <p className="text-textColor text-lg font-medium">
                      {selectedApp.author?.name || "Anonymous"}
                    </p>
                    <p className="text-textColorWeak text-sm">
                      @
                      {selectedApp.author?.username ||
                        selectedApp.author?.email?.split("@")[0] ||
                        "user"}
                    </p>
                    <Link
                      to="/profile/$profileId"
                      params={{
                        profileId:
                          selectedApp.author?._id ||
                          selectedApp.author?.id ||
                          "",
                      }}
                      className="text-left text-white h-[44px] mt-3 max-md:justify-center bg-mainColor px-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                    >
                      View profile
                    </Link>
                  </div>

                  {/* Reviews & Comments Section */}
                  <ReviewsSection
                    reviews={selectedApp.reviews || []}
                    averageRating={selectedApp.averageRating || 0}
                    reviewsCount={selectedApp.reviewsCount || 0}
                    onWriteReview={() => handleReviewClick(selectedApp)}
                    currentUser={authUser}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default AppGrid;
