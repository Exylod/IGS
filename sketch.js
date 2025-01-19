function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // Use WEBGL for 3D rendering
    colorMode(HSB, 360, 100, 100, 255);
}

function draw() {
    background(200, 50, 80); // Light background

    // Add light sources
    ambientLight(50); // Weak ambient light
    pointLight(255, 255, 255, 0, -300, 200); // White light from above
    directionalLight(200, 200, 200, -1, -1, -1); // Directional light from top-left

    // Enable mouse control for rotating the scene
    orbitControl();

    // Draw the floor
    drawFloor();

    // Draw buildings x, y, z, w, d, h
    drawBuilding(-390, 199, -410, 80, 120, 70, [360, 96, 88]); // Mensa
    drawBuilding(-410, 199, -410, 80, 120, 40, [360, 96, 88]); // Mensa low
    drawBuilding(-430, 199, -280, 120, 180, 80); // Jahrgang 5-7 Mittag
    drawBuilding(-500, 199, -280, 120, 180, 70); // Jahrgang 5-7 Mittag low
    drawBuilding(-380, 199, -205, 140, 200, 70); // Jahrgang 5-7
    drawBuilding(-410, 199, 0, 120, 160, 70); // Fachräume
    drawBuilding(-190, 199, 70, 170, 170, 70);  // Jahrgang 8-10
    drawBuilding(-55, 199, 20, 100, 75, 50);  // Jahrgang 8-10 Eingang
    drawBuilding(-90, 199, 180, 170, 250, 70, null);  // Jahrgang 8-10 Drogen
    // drawBuilding(0, 199, 0, 300, 200, 100);   // Oberstufe
    // drawBuilding(200, 199, 0, 250, 150, 80);  // Sporthalle
    // drawBuilding(-450, 199, 0, 100, 100, 20); // Schulgarten
}

// Draw the floor
function drawFloor() {
    push();
    fill(120, 40, 70); // Greenish for the ground
    noStroke();
    translate(0, 200, 0); // Position the floor below the buildings
    rotateX(HALF_PI);     // Rotate the floor to lie flat
    plane(1500, 1200);     // Large rectangle for the floor
    pop();
}

// Draw a building as a box
// x, y: Position of the building
// w, d: Width and depth of the building
// h: Height of the building
function drawBuilding(x, y, z, w, d, h, color) {
    if (!Array.isArray(color) || color.length !== 3) {
        console.warn("Invalid or missing color. Using default");
        color = [165, 1, 43]
    }
    push();
    fill(color[0], color[1], color[2]); // Building color
    noStroke();
    translate(x, y - h / 2, z); // Center the box around its base
    box(w, h, d); // Create a box with width, height, and depth
    pop();
}
