function calculate({ color, delta }) {
  const bigint = parseInt(color.slice(1), 16);

  const r_limit = (bigint >> 16) & 255;
  const g_limit = (bigint >> 8) & 255;
  const b_limit = (bigint >> 0) & 255;

  return {
    r: [r_limit - delta, r_limit + delta],
    g: [g_limit - delta, g_limit + delta],
    b: [b_limit - delta, b_limit + delta],
  };
}

export default calculate;