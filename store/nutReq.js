module.exports = [
  {
    name: "Broiler",
    stage: "starter",
    requirements: [
      { crudeProtein: "23-25" },
      {
        crudeFibre: 5,
      },

      { salt: 0.5 },
      {
        methionine: 0.51,
      },
      { lysine: 1.44 },
      { calcium: 1 },

      { phosphorous: 0.5 },
      { metabolizableEnergy: 3010 },
    ],
  },
  {
    name: "Broiler",
    stage: "grower",
    requirements: [
      { crudeProtein: "21-23" },

      { crudeFibre: 5 },
      { salt: 0.5 },
      { methionine: 0.45 },
      { lysine: 1.25 },
      { calcium: 0.9 },
      { phosphorous: 0.45 },
      { metabolizableEnergy: 3175 },
    ],
  },
  {
    name: "Broiler",
    stage: "finisher",
    requirements: [
      { crudeProtein: "19-21" },
      { crudeFibre: 5 },
      { salt: 0.5 },
      { methionine: 0.39 },
      { lysine: 1.05 },
      { calcium: 0.9 },
      { phosphorous: 0.42 },
      { metabolizableEnergy: 3225 },
    ],
  },

  {
    name: "layer",
    stage: "starter",
    requirements: [
      { crudeProtein: 20 },
      { crudeFibre: 7 },
      { salt: "" },
      { methionine: 1 },
      { lysine: 1 },
      { calcium: 0.5 },
      { phosphorous: 1 },
      { metabolizableEnergy: 2800 },
    ],
  },
  {
    name: "layer",
    stage: "grower",
    requirements: [
      { crudeProtein: 16 },
      { crudeFibre: 9 },
      { salt: "" },
      { methionine: 0.7 },
      { lysine: 1 },
      { calcium: 0.5 },
      { phosphorous: 1 },
      { metabolizableEnergy: 2500 },
    ],
  },
  {
    name: "layer",
    stage: "layer phase 1",
    requirements: [
      { crudeProtein: 18 },
      { crudeFibre: 9 },
      { salt: "" },
      { methionine: 0.7 },
      { lysine: 1 },
      { calcium: 0.5 },
      { phosphorous: 3 },
      { metabolizableEnergy: 2600 },
    ],
  },
  {
    name: "layer",
    stage: "layer phase 2",
    requirements: [
      { crudeProtein: 16 },
      { crudeFibre: 10 },
      { salt: "" },
      { methionine: 0.65 },
      { lysine: 1 },
      { calcium: 0.5 },
      { phosphorous: 3 },
      { metabolizableEnergy: 2400 },
    ],
  },
];
