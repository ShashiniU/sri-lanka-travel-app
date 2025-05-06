import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import numpy as np

# Generate dummy data for training
x_train = np.random.rand(100, 10)  # 100 samples, 10 features each
y_train = np.random.randint(0, 2, size=(100, 1))  # Binary classification labels

# Create a simple neural network model
model = Sequential([
    Dense(64, activation='relu', input_dim=10),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(x_train, y_train, epochs=10)

# Save the model
model.save('model')  # This will create both model.json and model-weights.bin
