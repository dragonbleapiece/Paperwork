class Color {

  constructor(r = 0, g = 0, b = 0, a = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getP5Color(sk) {
    return sk.color(this.r, this.g, this.b, this.a);
  }

}

Color.className = "Color";

export default Color;
