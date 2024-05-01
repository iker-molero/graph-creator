graph_creator_controller = function($scope) {

  // ===================================
  //               Variables
  // ===================================

  // Graph types:
  // 0 - Line graph
  // 1 - Bar graph
  // 2 - Pie graph
  $scope.selected_graph_type = 0;

  // ===================================
  //               Functions
  // ===================================

  $scope.change_graph_type = function(type) {

    if ($scope.selected_graph_type == type) return;

    $scope.selected_graph_type = type;

  }

};

app.controller('graph_creator_controller', graph_creator_controller);
