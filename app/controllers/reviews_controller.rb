class ReviewsController < ActionController::Base

    before_action :authenticate_user!, only: [:update, :destroy]

    def index
        reviews = Review.all
        render json: reviews
    end

    def show
        review = Review.find_by_id(params[:id])
        render json: review
    end

    def create
        review = Review.new(review_params)
        #need to use current_user.build to get this to work later when I Get the admin user working
        review.user = User.last
        if review.save
            render json: { status: 'ok'}
        else
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        review = Review.find_by_id(params[:id])
        if review.update(review_params)
             render json: { status: 'ok'}
        else
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        # I need to change the current_user portion to make sure its an admin user and the same id. 
        review = Review.find_by_id(params[:id])
        if review.user === current_user.id
        Comment.where("review_id = ?", review.id).each{|x| x.destroy}
          if review.destroy
          render json: { status: 'ok'}
          else
          render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
          end
      end

    end


    private

      def review_params
          params.require(:review).permit(:awards, :box_office, :director, :language, :picture_url, :production, :rated, :year, :runtime, :title, :review_type, :imdb_id, :viewing_platform, :those_movie_guys_rating, :those_movie_guys_review, :writer, :imdb_rating, :imdb_votes, :tomato_consensus_review, :tomato_user, :tomato_critics, :tomato_critics_votes, :tomato_user_votes, :tomato_url, :genres, :actors, :created_at, :updated_at, :user_id)
      end
  end