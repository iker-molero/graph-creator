const bar_graph_service = { canvas: undefined, ctx: undefined };

bar_graph_service.create_canvas = function(id) {

  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext('2d');

};

bar_graph_service.draw_canvas = function(graph_values, datasets) {

  // Filter all the empty labels
  const labels = graph_values.labels.filter((label) => label != "");

  // Get all the canvas variables
  const canvas = this.canvas;
  const ctx = this.ctx;

  const width = canvas.width;
  const height = canvas.height;
  const top = 0;
  const bottom = height;
  const left = 0;
  const right = width;

  // Clear the canvas
  ctx.clearRect(left, top, width, height);

  // Create the background if show background is enabled
  ctx.fillStyle = graph_values.background_color;
  if (graph_values.show_background) ctx.fillRect(top, left, right, bottom);

  const padding = 50;
  const padded_top = top + padding;
  const padded_left = left + (padding * 2);
  const padded_bottom = bottom - padding;
  const padded_right = right - (padding * 2);

  // Create the X labels and X grid
  // Get the points of each label
  const x_length = padded_right - padded_left;
  const x_label_gap = labels.length > 1 ? x_length / labels.length : 0;

  ctx.font = "14px Arial";
  ctx.fillStyle = graph_values.border_color;

  // Iterate though each label, caculate the position and render the text
  for (label_index in labels) {

    const label = labels[label_index];
    const text_width = ctx.measureText(label).width;
    const text_x_position = (padded_left - (text_width / 2)) + (x_label_gap * label_index);
    const text_y_position = padded_bottom + 20;
    ctx.fillText(label, text_x_position + (x_label_gap / 2), text_y_position);

    // Draw the grid line
    const grid_line_x_position = text_x_position + x_label_gap + (text_width / 2);

    ctx.beginPath();
    ctx.moveTo(grid_line_x_position, padded_bottom);
    ctx.lineTo(grid_line_x_position, padded_top);
    ctx.lineWidth = 1;
    ctx.strokeStyle = graph_values.grid_color;
    ctx.stroke();

  };

  // Create the Y labels and Y grid
  // Get the max value of all the datasets
  const active_datasets = datasets.filter((dataset) => dataset.active);
  let values_array = [];

  active_datasets.forEach(dataset => {

    values_array = values_array.concat(dataset.values);

  });

  const max_value = Math.ceil(Math.max(...values_array));
  const y_length = padded_bottom - padded_top;
  const y_label_gap = y_length / 9;
  const y_value_gap = max_value / 9;

  for (let i = 0; i < 9; i++) {

    const label = (max_value - (y_value_gap * i)).toFixed(1);
    const text_width = ctx.measureText(label).width;
    const text_y_position = (padded_top + 5 + (y_label_gap * i));
    ctx.fillText(label, padded_left - text_width - 10, text_y_position);

    // Calculate the grid starting position and draw the line
    const grid_line_y_position = text_y_position - 5;

    ctx.beginPath();
    ctx.moveTo(padded_left, grid_line_y_position);
    ctx.lineTo(padded_right, grid_line_y_position);
    ctx.lineWidth = 1;
    ctx.strokeStyle = graph_values.grid_color;
    ctx.stroke();

  };

  // Draw the bars
  // Iterate through each label
  const section_length = x_length / labels.length;

  for (label_index in labels) {

    const section_start = padded_left + (section_length * label_index);
    const section_padding = 20;
    const bar_padding = 5;
    const bar_width = (section_length - (section_padding * 2) - (bar_padding * (labels.length - 1))) / active_datasets.length;

    console.log(section_length, bar_width);

    active_datasets.forEach(dataset => {

      const dataset_index = active_datasets.indexOf(dataset);
      const value = dataset.values[label_index] < 0 ? 0 : dataset.values[label_index];
      const y_pos = (padded_top + y_length) - (value * y_length) / max_value;
      const x_pos = section_start + section_padding + (bar_width * dataset_index) + (bar_padding * dataset_index);
      const bar_height = padded_bottom - y_pos

      ctx.fillStyle = color_service.hex_to_rgba(dataset.color, 0.7);
      ctx.fillRect(x_pos, y_pos, bar_width, bar_height);

      ctx.strokeStyle = dataset.color;
      ctx.strokeRect(x_pos, y_pos, bar_width, bar_height);

    });

  };

  // Create the borders
  ctx.beginPath();
  ctx.moveTo(padded_left, padded_top);
  ctx.lineTo(padded_left, padded_bottom);
  ctx.lineTo(padded_right, padded_bottom);
  ctx.lineWidth = 2;
  ctx.strokeStyle = graph_values.border_color;
  ctx.stroke();

  // Create the legend
  // Iterate through each dataset and create a legend for it above the graph
  let starting_x = padded_left;

  active_datasets.forEach(dataset => {

    const bubble_radius = 10;
    const gap = 10;
    const label_width = ctx.measureText(dataset.name).width;
    const padding = 50;

    starting_x += bubble_radius;

    // Draw the bubble
    ctx.beginPath();
    ctx.arc(starting_x, padded_top - 30, bubble_radius, 0, 2 * Math.PI);
    ctx.fillStyle = color_service.hex_to_rgba(dataset.color, 0.5);
    ctx.strokeStyle = dataset.color;
    ctx.fill();
    ctx.stroke();

    starting_x += bubble_radius + gap;

    ctx.fillStyle = graph_values.border_color;
    ctx.fillText(dataset.name, starting_x, (padded_top - 30) + (bubble_radius / 2));

    starting_x += label_width + padding;

  });

};
