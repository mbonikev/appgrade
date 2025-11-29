import { useEffect, useState } from "react";
import AppCard from "./AppCard";
import { AnimatePresence, motion } from "framer-motion";
import { HiStar, HiCursorClick, HiOutlineBookmark } from "react-icons/hi";
import { RiChatSmile2Line } from "react-icons/ri";
import { Link } from '@tanstack/react-router';
import ReviewModal from '../../Preview/components/ReviewModal';
import api from '../../../lib/api';

interface AppGridProps {
  activeView?: "Following" | "Discover";
  selectedCategory?: string;
}

const AppGrid = ({ activeView = "Discover", selectedCategory = 'All' }: AppGridProps) => {
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProjectForReview, setSelectedProjectForReview] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        if (activeView === "Discover") {
          // Fetch all projects
          const response = await api.get('/api/projects');
          setProjects(response.data.projects || []);
        } else {
          // Fetch projects from followed users
          // TODO: Implement following system
          // For now, show empty or all projects
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeView]);

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
  const apps = projects.map(project => ({
    id: project._id,
    title: project.title,
    description: project.tagline,
    image: project.images?.[0] || 'https://via.placeholder.com/800x600',
    icon: project.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}`,
    badge: undefined,
    hasVideo: false,
    category: project.categories?.[0] || 'Other',
    type: project.type,
    submissionType: project.submissionType,
    link: project.link,
    isLocked: false,
    author: project.author, // Include author data
    averageRating: project.averageRating || 0,
    reviewsCount: project.reviewsCount || 0,
    reviews: project.reviews || []
  }));

  const filteredApps = apps.filter(app => {
    if (selectedCategory !== 'All' && app.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleReviewClick = (app: any) => {
    setSelectedProjectForReview(app);
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = () => {
    console.log("Review submitted for:", selectedProjectForReview);
    setReviewModalOpen(false);
    setSelectedProjectForReview(null);
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
          <p className="text-sm mt-2">Follow some creators to see their projects here</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pb-10">
        {filteredApps.map((app) => (
          <div key={app.id} onClick={() => setSelectedApp(app)}>
            <AppCard
              {...app}
              onReview={() => handleReviewClick(app)}
            />
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
                        {selectedApp.title} {selectedApp.type && selectedApp.type !== 'project' && (
                          <span className="text-textColorWeak">({selectedApp.type === 'ui_element' ? 'UI Element' : selectedApp.type === 'screens' ? 'Screen' : 'Theme'})</span>
                        )}
                      </h2>
                      <p className="text-textColor">
                        {selectedApp.description}
                      </p>
                      <div className="flex items-start justify-start gap-2 flex-wrap mt-3">
                        <p className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">UI/UX</p>
                        <p className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">Design Work</p>
                        <p className="bg-cardItemBg text-textColorWeak text-sm px-2 py-0.5 rounded-full font-medium">No Backend</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-end gap-6 pt-3 max-md:pt-0 max-sm:gap-3 max-md:flex-row-reverse">
                    <div className="border-r pr-6 max-md:border-r-[0] mr-0 border-linesColor h-[48px] flex items-center flex-col max-sm:items-end ">
                      <h1 className="flex items-center text-xl font-semibold gap-1">
                        <HiStar className="text-2xl text-orange-500 dark:text-orange-400 " />
                        3.3
                      </h1>
                      <p className="text-sm font-medium text-textColorWeak">(22,342<span className="max-sm:hidden"> Tested</span>)</p>
                    </div>
                    <button className="text-textColor h-[48px] aspect-square flex items-center justify-center text-2xl rounded-full bg-cardItemBg">
                      <HiOutlineBookmark />
                    </button>
                    {selectedApp.type === 'project' || selectedApp.submissionType === 'developed' ? (
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
                  {selectedApp.image && (
                    <img
                      src={selectedApp.image}
                      className="w-full rounded-2xl mt-6 shadow-2xl"
                      alt={selectedApp.title}
                    />
                  )}

                  {/* Author Section */}
                  <div className="w-full border-t border-linesColor mt-20 max-md:mt-14 pb-10 flex items-center justify-center flex-col gap-1.5 max-w-[90%] mx-auto">
                    <div className="size-20 max-md:size-14 -mt-11 max-md:-mt-8 ring-[10px] ring-modalBg rounded-full bg-cardBg shadow-md mb-2.5 overflow-hidden cursor-pointer">
                      <img
                        src={selectedApp.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedApp.author?.name || 'User')}`}
                        className="w-full h-full object-cover"
                        alt={selectedApp.author?.name || 'User'}
                      />
                    </div>
                    <p className="text-textColor text-lg font-medium">
                      {selectedApp.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-textColorWeak text-sm">
                      @{selectedApp.author?.username || selectedApp.author?.email?.split('@')[0] || 'user'}
                    </p>
                    <Link
                      to="/profile/$profileId"
                      params={{ profileId: selectedApp.author?._id || selectedApp.author?.id || '' }}
                      className="text-left text-white h-[44px] mt-3 max-md:justify-center bg-mainColor px-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2 hover:bg-mainColorHover transition-colors"
                    >
                      View profile
                    </Link>
                  </div>

                  {/* Reviews & Comments Section */}
                  <div className="w-full border-t border-linesColor mt-10 pt-10">
                    <h3 className="text-2xl font-bold text-textColor mb-6">Reviews & Comments</h3>

                    {/* Reviews Stats */}
                    <div className="flex items-center gap-6 mb-8 pb-6 border-b border-linesColor">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                          <HiStar className="text-3xl text-orange-500" />
                          <span className="text-3xl font-bold text-textColor">
                            {selectedApp.averageRating || 0}
                          </span>
                        </div>
                        <p className="text-sm text-textColorWeak">
                          {selectedApp.reviewsCount || 0} reviews
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-textColorWeak text-sm mb-2">
                          Be the first to review this project
                        </p>
                        <button
                          onClick={() => handleReviewClick(selectedApp)}
                          className="px-4 py-2 bg-mainColor text-white rounded-lg font-medium hover:bg-mainColorHover transition-colors text-sm"
                        >
                          Write a Review
                        </button>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {selectedApp.reviews && selectedApp.reviews.length > 0 ? (
                        selectedApp.reviews.map((review: any, index: number) => (
                          <div key={index} className="flex gap-4 pb-6 border-b border-linesColor last:border-0">
                            <img
                              src={review.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author?.name || 'User')}`}
                              className="w-10 h-10 rounded-full"
                              alt={review.author?.name}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-medium text-textColor">{review.author?.name}</p>
                                  <p className="text-xs text-textColorWeak">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                {review.rating && (
                                  <div className="flex items-center gap-1">
                                    <HiStar className="text-orange-500" />
                                    <span className="text-sm font-medium">{review.rating}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-textColorWeak">{review.comment}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-textColorWeak">
                          <p>No reviews yet. Be the first to review!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default AppGrid;
