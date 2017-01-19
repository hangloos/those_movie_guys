(function() {

    'use strict';

    angular
        .module('those-movie-guys')
        .controller('ReviewController', ReviewController)

   function ReviewController($location, ReviewsFactory) {
        var vm = this;

        vm.deleteReview = deleteReview;
        vm.createReviewInformation = createReviewInformation;
        vm.reset = reset;
        vm.editTrueValue = false;
        vm.showEditForm = showEditForm;

        activate();

        function activate() {
          getReviews();
        }

        function getReviews() {
          return ReviewsFactory.getReviews()
                        .then(setReviews)
        }

        function setReviews(data) {
          vm.totalReviews = data.length
          vm.reviews = data
          return vm.reviews
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
         }

         function showEditForm() {
          vm.editTrueValue = true
        }

        function deleteReview(id) {
          return ReviewsFactory.deleteReview(id)
                            .then(getReviews)
          
        }

    }



}());
