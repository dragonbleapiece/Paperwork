class Color {

  constructor(r = 0, g = 0, b = 0, a = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getColor(sk) {
    return sk.color(this.r / 255, this.g / 255, this.b / 255, this.a / 255);
  }

}

Color.className = "Color";

export default Color;
