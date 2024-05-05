const pie_graph_service = { canvas: undefined, ctx: undefined };

pie_graph_service.create_canvas = function(id) {

    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');

};

pie_graph_service.draw_canvas = function(graph_values, datasets) {

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

    // Set variables for the graph
    const graph_center_x = width / 2;
    const graph_center_y = (width / 2) - 75;
    const graph_radius = 125;

    // Iterate though all active datasets
    const active_datasets = datasets.filter((dataset) => dataset.active);

    const sum_of_values = active_datasets.map((dataset) => Number(dataset.value < 0 ? 0 : dataset.value)).reduce((a, b) => a + b);
    let last_end_radius = 1.5;

    // Draw the pie section for each dataset
    for (let dataset of active_datasets) {
        
        const value = dataset.value < 0 ? 0 : dataset.value;
        const value_degrees = (value * 2) / sum_of_values;
        const end_radius = last_end_radius + value_degrees;
        ctx.beginPath();
        ctx.arc(graph_center_x, graph_center_y, graph_radius, (last_end_radius * Math.PI), (end_radius * Math.PI));
        ctx.lineTo(graph_center_x, graph_center_y);
        ctx.closePath();
        ctx.fillStyle = dataset.color;
        ctx.fill();
        last_end_radius = end_radius;

    };

    // Create the legend
    // Iterate through each dataset and create a legend for it above the graph

    const bubble_radius = 10;
    const gap = 20;
    const padding = 30;
    let starting_x = 25 + bubble_radius;
    let starting_y = 310;

    active_datasets.forEach(dataset => {

        const value = dataset.value < 0 ? 0 : dataset.value;
        const label = `${dataset.name}: ${value}`;

        // Draw the bubble
        ctx.beginPath();
        ctx.arc(starting_x, starting_y, bubble_radius, 0, 2 * Math.PI);
        ctx.fillStyle = color_service.hex_to_rgba(dataset.color, 0.5);
        ctx.strokeStyle = dataset.color;
        ctx.fill();
        ctx.stroke();

        // Draw the label
        ctx.font = "14px Arial";
        ctx.fillStyle = graph_values.labels_color;
        ctx.fillText(label, starting_x + gap, starting_y + 5);    

        starting_y += padding;

    });

};