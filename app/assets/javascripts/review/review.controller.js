(function() {

    'use strict';

    angular
        .module('those-movie-guys')
        .controller('ReviewController', ReviewController)

   function ReviewController($location, $stateParams, ReviewsFactory, CommentsFactory, LikesFactory, ListsFactory) {
        var vm = this;

        vm.deleteReview = deleteReview;
        vm.createReviewInformation = createReviewInformation;
        vm.reset = reset;
        vm.editTrueValue = false;
        vm.showEditForm = showEditForm;
        vm.editReviewRating = editReviewRating;
        vm.createComment = createComment;
        vm.loadMore = loadMore;
        vm.deleteComment = deleteComment;
        vm.createLike = createLike;
        vm.getReviewShow = getReviewShow;
        vm.setReview = setReview;
        vm.createList = createList;
        vm.showListForm = showListForm
        vm.listFormValue = false;


        vm.commentsLimit = 2;
        

        activate();

        function activate() {
          getReviews();
        }

        function getReviews() {
          vm.newComment = ""
          vm.newReview = ""
          return ReviewsFactory.getReviews()
                        .then(setReviews)
        }

        function setReviews(data) {
          vm.totalReviews = data.length
          vm.reviews = data
          return vm.reviews
        }

        function getReviewShow(id)  {
            return ReviewsFactory.getReview(id)
                                        .then(setReview)
        }

        function setReview(review)  {
            vm.reviewData = review

        }

        function setNewReview(movie) {
          vm.newReview.title = movie.Title
          vm.newReview.actors = movie.Actors
          vm.newReview.genres = movie.Genre
          vm.newReview.awards = movie.Awards
          vm.newReview.box_office = movie.BoxOffice
          vm.newReview.director = movie.Director
          vm.newReview.language = movie.Language
          vm.newReview.picture_url = movie.Poster
          vm.newReview.production = movie.Production
          vm.newReview.rated = movie.Rated
          vm.newReview.year = movie.Year
          vm.newReview.runtime = movie.Runtime
          vm.newReview.review_type = movie.Type
          vm.newReview.writer = movie.Writer
          vm.newReview.imdb_rating = movie.imdbRating
          vm.newReview.imdb_votes = movie.imdbVotes
          vm.newReview.tomato_consensus_review = movie.tomatoConsensus
          vm.newReview.tomato_user = movie.tomatoUserMeter
          vm.newReview.tomato_user_votes = movie.tomatoUserReviews
          vm.newReview.tomato_critics = movie.tomatoMeter
          vm.newReview.tomato_critics_votes = movie.tomatoReviews
          vm.newReview.tomato_url = movie.tomatoURL
        
          return ReviewsFactory.createReview(vm.newReview)
                              .then(setReviews)

        }

        function createReviewInformation() {
          return ReviewsFactory.getInformation(vm.newReview.imdb_id)
                               .then(setNewReview)
         }

         function reset() {
          vm.newReview = {}
          vm.editTrueValue = false
          vm.newList = {}
         }

         function showEditForm() {
          vm.editTrueValue = true
        }

        function showListForm() {
          vm.listFormValue = true
        }

        function deleteReview(id) {
          return ReviewsFactory.deleteReview(id)
                            .then(getReviews)
          
        }

        function editReviewRating(id) {
          return ReviewsFactory.updateReview(id,this.newReview)
                            .then(getReviews)
          
        }

        function createComment(id)  {
          return CommentsFactory.createComment(id, this.newComment)
                                .then(getReviews)
        }

        function loadMore(id) {
          return CommentsFactory.getCommentsTotal(id)
                                  .then(setLimit)
        }

        function setLimit(review) {
          vm.commentsLimit = review.comments.length
          getReviews();

        }

        function deleteComment(comment_id)  {
          return CommentsFactory.deleteComment(comment_id)
                                  .then(getReviews)
        }

        function createLike(review_id, comment_id) {
          return LikesFactory.createLike(review_id,comment_id)
                                  .then(getReviews)
        }

        function deleteLike(review_id,comment_id) {
          return LikesFactory.deleteLike(review_id,comment_id)
                                  .then(getReviews)
        }

        function createList(id) {
          return ListsFactory.createList(id, this.newList)
                                .then(getReviews)
        }


    }



}());
