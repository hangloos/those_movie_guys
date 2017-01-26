class ListsController < ActionController::Base

    before_action :authenticate_user!, only: [:create, :delete]

    def create
        list = current_user.lists.build(name: params[:name])
          if list.save
              render json: { status: 'ok'}
          else
              render json: { errors: like.errors.full_messages },  status: :unprocessable_entity
          end
    end

    # def destroy
    #   binding.pry
    #   like = like.find_by_id(params[:like][:id])
    #         if like.user == current_user
    #         like.delete
    #         render json: { status: 'ok'}
    #         else
    #         render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
    #         end
    # end


    def bookmark
      list = List.find(params[:id])
      review = Review.find_by_id(params[:review_id])
      list.reviews << review
        if  list.save
          render json: { status: 'ok'}
        else
           render json: { errors: like.errors.full_messages },  status: :unprocessable_entity
        end
    end



end