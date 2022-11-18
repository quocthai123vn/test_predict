const PREDICT_RESULT: { [key: number]: string } = {
  0: "Waiting for result",
  1: "Win",
  2: "Lose",
  3: "draw",
};

const MATCH_STATUS: { [key: number]: string } = {
  1: "Waiting",
  2: "Happening",
  3: "Finished",
};

export { PREDICT_RESULT, MATCH_STATUS };
