import { useEffect, useState } from "react";
import AppCard from "./AppCard";
import { AnimatePresence, motion } from "framer-motion";
import { HiStar, HiCursorClick, HiOutlineBookmark } from "react-icons/hi";
import { RiChatSmile2Line } from "react-icons/ri";
import { Link, useNavigate } from '@tanstack/react-router';
import ReviewModal from '../../Preview/components/ReviewModal';

interface AppGridProps {
  activeView?: "Following" | "Discover";
  selectedCategory?: string;
}

// Mock Data based on the image
export const apps = [
  {
    id: 1,
    title: "Acctual",
    description: "Crypto invoice & B2B payments",
    image:
      "https://htmlburger.com/blog/wp-content/uploads/2024/10/Web-App-Design-Example-Learnify-Online-Courses-Platform.webp", // Placeholder
    icon: "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg", // Placeholder
    badge: "New" as const,
    hasVideo: true,
    category: "SaaS",
    type: 'project' as const
  },
  {
    id: 2,
    title: "Hers",
    description: "Women's healthcare",
    image:
      "https://saaslandingpage.com/wp-content/uploads/2023/09/3-mobbin@2x-680x510.png", // Placeholder
    icon: "https://i.pinimg.com/564x/86/c9/7d/86c97d86681b9fedbf23a61a00c0f566.jpg", // Placeholder
    badge: "New" as const,
    category: "Productivity",
    type: 'project' as const
  },
  {
    id: 3,
    title: "ClickUp",
    description: "The everything app for work",
    image:
      "https://i.pinimg.com/1200x/f4/17/c1/f417c18098a0f16de8046d8ac8ff855a.jpg", // Placeholder
    icon: "https://storage.pixteller.com/designs/designs-images/2017-09-21/09/twitter-profile-picture-avatar-1-59c3626d82bb3.png", // Placeholder
    badge: "Updated" as const,
    category: "Productivity",
    type: 'project' as const
  },
  {
    id: 4,
    title: "Adaline",
    description: "End-to-end AI agent platform",
    image: "https://budibase.com/web-app-design/intercom.png", // Placeholder
    icon: "https://img.freepik.com/premium-vector/dog-illustration-cute-style_1130875-2027.jpg?semt=ais_hybrid&w=740&q=80", // Placeholder
    category: "Design",
    type: 'screens' as const // Assuming Design category implies screens/UI
  },
  {
    id: 5,
    title: "Fabric",
    description: "AI notes, files, ideas",
    image:
      "https://saaslandingpage.com/wp-content/uploads/2023/09/1-saasinterface@2x-680x510.png", // Placeholder
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJOBtmsTg3eCaFRGi3z1l7e3SGQEDe9u7WA&s", // Placeholder
    isLocked: true,
    hasVideo: true,
    category: "SaaS",
    type: 'project' as const
  },
  {
    id: 6,
    title: "Babbel",
    description: "Learn a language online",
    image: "https://appshots.design/images/landing/img1.webp", // Placeholder
    icon: "https://m.gjcdn.net/fireside-post-image/900/23034951-5jh9fjqx-v4.webp", // Placeholder
    isLocked: true,
    category: "Education",
    type: 'project' as const
  },
];

const AppGrid = ({ selectedCategory = 'All' }: AppGridProps) => {
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProjectForReview, setSelectedProjectForReview] = useState<any>(null);
  const navigate = useNavigate();

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
              className="w-full max-w-[84%] max-lg:max-w-full mx-auto h-[calc(100svh-56px)] p-6 max-xl:p-2 max-lg:px-0 overflow-y-auto bg-modalBg rounded-t-3xl shadow-xl fixed top-14 left-0 right-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col max-w-[88%] mx-auto p-10 max-xl:px-10 max-lg:py-6 max-lg:px-0">
                <div className="w-full sticky top-0 z-10 bg-modalBg pb-4 flex items-start justify-between max-md:flex-col max-md:items-start gap-3 max-md:gap-0">
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
                {selectedApp.image && (
                  <img
                    src={selectedApp.image}
                    className="w-full rounded-2xl mt-6 shadow-2xl"
                    alt={selectedApp.title}
                  />
                )}
              </div>
              <div className="w-full border-t border-linesColor mt-20 max-md:mt-14 pb-10 flex items-center justify-center flex-col gap-1.5 max-w-[90%] mx-auto">
                <div className="size-20 max-md:size-14 -mt-11 max-md:-mt-8 ring-[10px] ring-modalBg rounded-full bg-cardBg shadow-md mb-2.5 overflow-hidden cursor-pointer">
                  <img
                    src="https://i.pinimg.com/736x/a9/70/8f/a9708f9840565fc2aae91b5847fcceab.jpg"
                    className="w-full h-full object-cover"
                    alt="User"
                  />
                </div>
                <p className="text-textColor text-lg font-medium">UserName</p>
                <p className="text-textColor">🇳🇬 Nigeria</p>
                <p className="line-clamp-2 max-w-[280px] text-textColorWeak text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam eos sit nostrum totam temporibus iusto illo
                  praesentium sed veniam! Deserunt ab rem minima suscipit
                  obcaecati doloribus commodi repudiandae aspernatur autem.
                </p>
                <button className="text-left text-white h-[44px] mt-3 max-md:justify-center bg-mainColor px-5 whitespace-nowrap rounded-full font-medium flex items-center justify-start gap-2">
                  View profile
                </button>
              </div>

              <div className=""></div>
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
