graph_creator_controller = function($scope) {

  // ===================================
  //               Variables
  // ===================================

  // Graph types:
  // 0 - Line graph
  // 1 - Bar graph
  // 2 - Pie graph
  $scope.selected_graph_type = 0;

  // Input type:
  // 0 - Graph data input
  // 1 - Dataset data input
  $scope.selected_input_type = 0;

  // Line graph values:
  // Background color - (Hex value)
  // Border color - (Hex value)
  // Grid color - (Hex value)
  // Labels - [Strings]
  $scope.line_graph_values = {

    show_background: true,
    background_color: "#0C0C0C",
    border_color: "#FFFFFF",
    grid_color: "#6F6F6F",
    labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]

  };

  // Line datasets values:
  // Dataset item:
  // - Active - (Bool)
  // - Name - (String)
  // - Color - (Hex value)
  // - values - [Ints]
  $scope.line_graph_datasets = [

    {
      active: true,
      name: "Dataset 1",
      color: "#ff0000",
      values: new Array(10).fill().map(() => Math.floor(Math.random() * 100))
    },

    {
      active: true,
      name: "Dataset 2",
      color: "#0000ff",
      values: new Array(10).fill().map(() => Math.floor(Math.random() * 100))
    },

    {
      active: true,
      name: "Dataset 3",
      color: "#00ff00",
      values: new Array(10).fill().map(() => Math.floor(Math.random() * 100))
    }

  ];

  // ===================================
  //               Functions
  // ===================================

  $scope.change_graph_type = function(type) {

    if ($scope.selected_graph_type == type) return;

    $scope.selected_graph_type = type;

  };

  $scope.change_input_type = function(type) {

    if ($scope.selected_input_type == type) return;

    $scope.selected_input_type = type;

  };

  // Reload graphs

  $scope.reload_line_graph = function() {

    line_graph_service.draw_canvas($scope.line_graph_values, $scope.line_graph_datasets);

  };

  // ====================================
  //                 On-load
  // ====================================
  line_graph_service.create_canvas('line_graph');
  line_graph_service.draw_canvas($scope.line_graph_values, $scope.line_graph_datasets);

};

app.controller('graph_creator_controller', graph_creator_controller);
