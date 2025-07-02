const computeMatchScore = (prefs, hood) => {
  const weights = prefs;
  const scores = [
    weights.safety * hood.safety,
    weights.nightlife * hood.nightlife,
    weights.schools * hood.schools,
    weights.affordability * hood.affordability,
    weights.parks * hood.parks,
  ];

  const maxScore = 10 * Object.values(weights).reduce((a, b) => a + b, 0);
  return Math.round((scores.reduce((a, b) => a + b, 0) / maxScore) * 100);
};

export default computeMatchScore;
