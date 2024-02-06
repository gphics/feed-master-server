const jwtVerify = require("../../../configs/encryption/jwtVerify");
const errorGenerator = require("../../../configs/errorGenerator");
const userModel = require("../../../models/userModel");
const ingredientGrouping = require("../../../utils/ingredientGrouping");
const processingFixedIngredients = require("../../../utils/processingFixedIngredients");
const transformingReqCp = require("../../../utils/transformingReqCp");
const calcNutrientSource = require("../../../utils/calcNutrientSource");
const pearsonsMethod = require("../../../utils/pearsonsMethod");
const processingNonFixed = require("../../../utils/processingNonFixed");
const formulaModel = require("../../../models/formulaModel");
const deepClone = require("../../../utils/deepClone");

module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;
    // getting and validating user input
    const {
      mixingRatio,
      name,
      description,
      input,
      requiredQuantity,
      requiredCrudeProtein,
    } = req.body;
    const deepClonedInput = deepClone(input);
    // grouping the ingredients
    const {
      data: { fixedIngredients, nonFixedIngredients },
      err: groupingError,
    } = ingredientGrouping(deepClonedInput);
    if (groupingError) {
      return next(errorGenerator(groupingError));
    }

    // ______________
    // ______________
    // handling fixedIngredients

    const { data: processedFixedData, err: fixedErr } =
      processingFixedIngredients(fixedIngredients);

    // ______________
    // ______________
    // handling the nonFixed
    if (
      nonFixedIngredients.energySource.length === 0 ||
      nonFixedIngredients.proteinSource.length === 0
    ) {
      return next(
        errorGenerator(
          "at least one protein source and one energy source nust be provided"
        )
      );
    }
    // procesing
    // calculating the energy source cp
    const { data: energyCpData, err: energyCpErr } = calcNutrientSource(
      nonFixedIngredients.energySource,
      mixingRatio?.energySource || null
    );

    // calculating the protein source cp
    const { data: proteinCpData, err: proteinCpErr } = calcNutrientSource(
      nonFixedIngredients.proteinSource,
      mixingRatio?.proteinSource || null
    );
    // error boundary
    if (proteinCpErr || energyCpErr) {
      return next(errorGenerator(proteinCpErr || energyCpErr));
    }

    // ______________
    // ______________
    // transforming the request
    const transformedReq = transformingReqCp(
      requiredCrudeProtein,
      requiredQuantity,
      processedFixedData.overallFixedQuantity,
      processedFixedData.overAllFixedContributedCp
    ).data;

    // ______________
    // ______________
    // calculating with the pearsons method
    const fromPearson = pearsonsMethod(
      energyCpData,
      proteinCpData,
      transformedReq.finalFeedCp,
      transformedReq.netFeedQuantity
    ).data;

    // ______________
    // ______________
    // processing the result from pearsonsMethod
    const processedNonFixedData = processingNonFixed(
      nonFixedIngredients,
      mixingRatio,
      fromPearson
    ).data;
    // ______________
    // ______________
    // creating the ouput object
    const output = {
      fixed: {
        ingredients: {
          noCp: processedFixedData.noCp,
          hasCp: processedFixedData.hasCp,
        },
        contributedCp: processedFixedData.overAllFixedContributedCp,
        contributedQuantity: processedFixedData.overallFixedQuantity,
        contributedCost: processedFixedData.overallFixedCost,
      },
      nonFixed: {
        ingredients: {
          energySource: processedNonFixedData.energyWithCCP,
          proteinSource: processedNonFixedData.proteinWithCCP,
        },
        contributedCp: processedNonFixedData.finalTotalNonFixedContributedCp,
        contributedCost: processedNonFixedData.finalTotalNonFixedCost,
        contributedQuantity: processedNonFixedData.finalTotalNonFixedQuantity,
      },
      percentageRequiredCp: requiredCrudeProtein,
      requiredQuantity,
      kgRequiredCp: transformedReq.cpQuantity,
      totalCost:
        processedNonFixedData.finalTotalNonFixedCost +
        processedFixedData.overallFixedCost,
      totalCp:
        processedNonFixedData.finalTotalNonFixedContributedCp +
        processedFixedData.overAllFixedContributedCp,
      totalQuantity:
        processedNonFixedData.finalTotalNonFixedQuantity +
        processedFixedData.overallFixedQuantity,
    };

    // getting user data
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      return next(errorGenerator(err));
    }
    const user = await userModel.findOne({ email: data.email });
    const builtFormula = {
      name,
      description,
      mixingRatio,
      input,
      output,
      requiredQuantity,
      requiredCrudeProtein,
      creator: user._id,
    };
    const formula = await formulaModel.create({ ...builtFormula });
    user.formulas.push(formula._id);
    await user.save();

    res.json({
      data: { data:{_id: formula._id}, auth_token },
      err: null,
    });
  } catch (error) {
    next(errorGenerator(error.message));
  }
};
