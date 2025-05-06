const tf = require('@tensorflow/tfjs-node');
const path = require('path');

// Load Data (for example purposes, use preprocessed JSON data or from your database)
const placesData = require('../../data/places_data.json');

// Preprocess function to convert text to numeric features
function preprocessData(data) {
  return data.map(place => ({
    description: place.description, // Example: Use description or other features as text
    category: place.category,
    ecoFriendly: place.eco_friendly ? 1 : 0,
    isRural: place.is_rural ? 1 : 0,
  }));
}

// Simple model: Neural network for recommendation
function createModel(inputShape) {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [inputShape] }));
  model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  return model;
}

async function trainModel() {
  const processedData = preprocessData(placesData);
  const inputs = processedData.map(d => [d.ecoFriendly, d.isRural]);
  const outputs = processedData.map(d => 1);  // Example: assume all places are relevant

  const inputTensor = tf.tensor2d(inputs);
  const outputTensor = tf.tensor2d(outputs, [outputs.length, 1]);

  const model = createModel(2);  // Assuming two inputs (eco-friendly, rural)
  await model.fit(inputTensor, outputTensor, { epochs: 10 });
  await model.save(`file://${path.join(__dirname, 'model')}`);
}

async function recommendPlaces(userPreferences) {
  const model = await tf.loadLayersModel(`file://${path.join(__dirname, 'model/model.json')}`);

  const recommendations = placesData.map(place => {
    const inputs = [place.eco_friendly ? 1 : 0, place.is_rural ? 1 : 0]; // Use relevant features
    const inputTensor = tf.tensor2d([inputs]);

    const prediction = model.predict(inputTensor);
    return { place, score: prediction.dataSync()[0] }; // Score between 0 and 1
  });

  recommendations.sort((a, b) => b.score - a.score);
  return recommendations.slice(0, 5); // Top 5 recommendations
}

module.exports = { trainModel, recommendPlaces };
