$(function(){


  $("#sign-up-link").click(function(){
    $("#mc-embedded-subscribe-form").submit();
  });

  var features = $(".feature");
  if(features.length > 0) {
    var featureSelectors = $("#feature-select div");
    var featureTimeout = null;
    var selectedFeature = 0;
    var numFeatures = features.length;
    var rotateFeature = function(newIndex) {
      var oldFeature = features.eq(selectedFeature);
      var oldSelector = featureSelectors.eq(selectedFeature);
      selectedFeature = newIndex;
      selectedFeature = selectedFeature % numFeatures;
      var newFeature = features.eq(selectedFeature);
      var newSelector = featureSelectors.eq(selectedFeature);
      oldFeature.fadeOut(700);
      oldSelector.removeClass('selected');
      newFeature.fadeIn(700);
      newSelector.addClass('selected');
      featureTimeout = setTimeout(rotateFeatures, 5000);
    };
    featureSelectors.click(function(){
      clearTimeout(featureTimeout);
      rotateFeature($(this).index());
    });
    var rotateFeatures = function() {
      rotateFeature(selectedFeature + 1);
    };
    $("#feature-play").click(function(){
      clearTimeout(featureTimeout);
      $("#feature-pause").show();
      $(this).hide();
      rotateFeature(selectedFeature + 1);
      return false;
    });
    $("#feature-pause").click(function(){
      clearTimeout(featureTimeout);
      $("#feature-play").show();
      $(this).hide();
      return false;
    });
    featureTimeout = setTimeout(rotateFeatures, 5000);
  }
});