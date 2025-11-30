import React from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { RiChatSmile2Line } from 'react-icons/ri';

interface Review {
    _id?: string;
    user: {
        _id?: string;
        name: string;
        avatar?: string;
        username?: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewsSectionProps {
    reviews: Review[];
    averageRating: number;
    reviewsCount: number;
    onWriteReview: () => void;
    onDeleteReview: (reviewId: string) => void;
    currentUser?: any;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
    reviews,
    averageRating,
    reviewsCount,
    onWriteReview,
    onDeleteReview,
    currentUser
}) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Unknown date';

        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 7) {
            if (diffDays === 1) return 'Yesterday';
            return `${diffDays} days ago`;
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Calculate rating distribution
    const ratingDistribution = React.useMemo(() => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        if (!reviews || reviews.length === 0) return distribution;

        reviews.forEach(review => {
            const rating = Math.round(review.rating);
            if (rating >= 1 && rating <= 5) {
                distribution[rating as keyof typeof distribution]++;
            }
        });
        return distribution;
    }, [reviews]);

    return (
        <div className="w-full border-t border-linesColor mt-10 pt-10">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-textColor">
                    Reviews & Comments
                </h3>
                <button
                    onClick={onWriteReview}
                    className="px-5 py-2.5 bg-cardItemBg text-textColor font-medium rounded-full hover:bg-cardItemBgHover transition-colors flex items-center gap-2"
                >
                    <RiChatSmile2Line className="text-lg" />
                    Write a Review
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
                {/* Stats Column */}
                <div className="bg-cardBg p-6 rounded-3xl h-fit">
                    <div className="flex flex-col items-center text-center">
                        <h4 className="text-5xl font-bold text-textColor mb-2">{averageRating.toFixed(1)}</h4>
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <HiStar
                                    key={star}
                                    className={`text-xl ${star <= Math.round(averageRating) ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'}`}
                                />
                            ))}
                        </div>
                        <p className="text-textColorWeak font-medium">
                            Based on {reviewsCount} review{reviewsCount !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="mt-8 space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = ratingDistribution[star as keyof typeof ratingDistribution];
                            const percentage = reviewsCount > 0 ? (count / reviewsCount) * 100 : 0;

                            return (
                                <div key={star} className="flex items-center gap-3 text-sm">
                                    <span className="font-medium text-textColor w-3">{star}</span>
                                    <div className="flex-1 h-2 bg-bodyBg rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-textColorWeak w-6 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => {
                            const isAuthor = currentUser && (
                                currentUser.id === review.user?._id ||
                                currentUser._id === review.user?._id
                            );

                            return (
                                <motion.div
                                    key={review._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-cardBg p-6 rounded-3xl group relative"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={review.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || 'User')}`}
                                                alt={review.user?.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <h5 className="font-bold text-textColor">{review.user?.name}</h5>
                                                <p className="text-xs text-textColorWeak">{formatDate(review.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 bg-bodyBg px-2 py-1 rounded-lg">
                                                <HiStar className="text-orange-500 text-sm" />
                                                <span className="font-bold text-textColor text-sm">{review.rating}</span>
                                            </div>

                                            {isAuthor && (
                                                <button
                                                    onClick={() => review._id && onDeleteReview(review._id)}
                                                    className="text-red-500 hover:text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-textColor leading-relaxed">
                                        {review.comment}
                                    </p>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 bg-cardBg rounded-3xl border-2 border-dashed border-linesColor">
                            <div className="w-16 h-16 bg-cardItemBg rounded-full flex items-center justify-center mx-auto mb-4">
                                <RiChatSmile2Line className="text-3xl text-textColorWeak" />
                            </div>
                            <h4 className="text-xl font-bold text-textColor mb-2">No reviews yet</h4>
                            <p className="text-textColorWeak mb-6 max-w-xs mx-auto">
                                Be the first to share your thoughts on this project.
                            </p>
                            <button
                                onClick={onWriteReview}
                                className="text-mainColor font-bold hover:underline"
                            >
                                Write a review
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewsSection;
