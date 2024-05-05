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
    labels: ["2019 Q3", "2019 Q4", "2020 Q1", "2020 Q2", "2020 Q3", "2020 Q4", "2021 Q1", "2021 Q2", "2021 Q3", "2021 Q4"]

  };

  // Line datasets values:
  // Dataset item:
  // - Active - (Bool)
  // - Name - (String)
  // - Color - (Hex value)
  // - Values - [Ints]
  $scope.line_graph_datasets = [

    {
      active: true,
      name: "Javascript",
      color: "#F7DF1E",
      values: [142693, 116636, 113844, 130010, 99493, 94999, 86877, 73535, 64938, 50087]
    },

    {
      active: true,
      name: "Python",
      color: "#3776AB",
      values: [108596, 107953, 113350, 130779, 111855, 101529, 99287, 85788, 80105, 62837]
    },

    {
      active: true,
      name: "Rust",
      color: "#FF642D",
      values: [4745, 5406, 5058, 5857, 4725, 4512, 4182, 3688, 3063, 2653]
    }

  ];

  // Bar graph values:
  // Background color - (Hex value)
  // Border color - (Hex value)
  // Grid color - (Hex value)
  // Labels - [Strings]
  $scope.bar_graph_values = {

    show_background: true,
    background_color: "#0C0C0C",
    border_color: "#FFFFFF",
    grid_color: "#6F6F6F",
    labels: ["2017", "2018", "2019", "2020", "2021"]

  };

  // Bar datasets values:
  // Dataset item:
  // - Active - (Bool)
  // - Name - (String)
  // - Color - (Hex value)
  // - Values - [Ints]
  $scope.bar_graph_datasets = [

    {
      active: true,
      name: "Javascript",
      color: "#F7DF1E",
      values: [1477140, 662691, 787866, 817650, 613030]
    },

    {
      active: true,
      name: "Python",
      color: "#3776AB",
      values: [970465, 740172, 770913, 809805, 676289]
    },

    {
      active: true,
      name: "C",
      color: "#A8B9CC",
      values: [153689, 122630, 131482, 133868, 114026]
    },

    {
      active: true,
      name: "Kotlin",
      color: "#7F52FF",
      values: [40442, 35346, 41234, 44630, 38665]
    },

    {
      active: true,
      name: "Rust",
      color: "#FF642D",
      values: [46766, 30269, 35479, 43201, 28015]
    },

  ];

  // Pie graph values:
  // Background color - (Hex value)
  // Labels color - (Hex value)
  $scope.pie_graph_values = {

    show_background: true,
    background_color: "#0C0C0C",
    labels_color: "#FFFFFF",

  };

  // Bar datasets values:
  // Dataset item:
  // - Active - (Bool)
  // - Name - (String)
  // - Color - (Hex value)
  // - Value - Int
  $scope.pie_graph_datasets = [

    {
      active: true,
      name: "Javascript",
      color: "#F7DF1E",
      value: 1100421
    },

    {
      active: true,
      name: "Python",
      color: "#3776AB",
      value: 548870
    },

    {
      active: true,
      name: "C",
      color: "#A8B9CC",
      value: 292000
    },

    {
      active: true,
      name: "Kotlin",
      color: "#7F52FF",
      value: 7416
    },

    {
      active: true,
      name: "Rust",
      color: "#FF642D",
      value: 15424
    },

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

  $scope.reload_bar_graph = function() {

    bar_graph_service.draw_canvas($scope.bar_graph_values, $scope.bar_graph_datasets);

  };

  $scope.reload_pie_graph = function() {

    pie_graph_service.draw_canvas($scope.pie_graph_values, $scope.pie_graph_datasets);

  };

  $scope.download_graph = function() {

    let id_to_download = "";

    switch ($scope.selected_graph_type) {

      case 0:
        id_to_download = "line_graph";
        break;

      case 1:
        id_to_download = "bar_graph";
        break;

      case 2:
        id_to_download = "pie_graph";
        break;
    
      default:
        id_to_download = "line_graph";
        break;
    }

    let canvas = document.getElementById(id_to_download);
    var data_url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    a.href = data_url;
    a.download = `${id_to_download}.png`;
    a.click();

  };

  // ====================================
  //                 On-load
  // ====================================

  line_graph_service.create_canvas('line_graph');
  line_graph_service.draw_canvas($scope.line_graph_values, $scope.line_graph_datasets);

  bar_graph_service.create_canvas('bar_graph');
  bar_graph_service.draw_canvas($scope.bar_graph_values, $scope.bar_graph_datasets);

  pie_graph_service.create_canvas('pie_graph');
  pie_graph_service.draw_canvas($scope.pie_graph_values, $scope.pie_graph_datasets);

};

app.controller('graph_creator_controller', graph_creator_controller);
