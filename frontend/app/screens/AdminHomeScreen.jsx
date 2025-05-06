import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import TourismPlaceForm from "../../components/admin/TourismPlaceForm";
import UploadImages from "../../components/admin/UploadImages";
import AddFacilities from "../../components/admin/AddFacilities";
import BASE_URL from "../../constants/config";
import axios from "axios";

export default function AdminHomeScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    placeDetails: {},
    images: [],
    facilities: [],
  });

  const handlePlaceDetailsSubmit = (placeDetails) => {
    setFormData((prev) => ({ ...prev, placeDetails }));
    setCurrentStep(2);
  };

  const handleImagesSubmit = (images) => {
    setFormData((prev) => ({ ...prev, images }));
    setCurrentStep(3);
  };

  const handleFacilitiesSubmit = async (facilities) => {
    try {
      setIsSubmitting(true);

      const completeData = { ...formData, facilities };
      const apiData = new FormData();

      Object.keys(completeData.placeDetails).forEach((key) => {
        apiData.append(key, completeData.placeDetails[key]);
      });
    

      apiData.append("facilities", JSON.stringify(facilities));
//       apiData.append("latitude", completeData.placeDetails.latitude);
// apiData.append("longitude", completeData.placeDetails.longitude);
console.log("FormData:", apiData); // Debugging line
    

      completeData.images.forEach((imageUri, index) => {
        apiData.append("images", {
          uri: imageUri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });

      const response = await axios.post(
        `${BASE_URL}/api/tourism/tourism-places`,
        apiData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.status === 200) {
        throw new Error("Failed to submit tourism place");
      }

      Alert.alert("Success", "Tourism place added successfully!", [
        { text: "OK", onPress: () => resetForm() },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to submit tourism place");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      placeDetails: {},
      images: [],
      facilities: [],
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TourismPlaceForm onNext={handlePlaceDetailsSubmit} />;
      case 2:
        return <UploadImages onNext={handleImagesSubmit} />;
      case 3:
        return <AddFacilities onFinish={handleFacilitiesSubmit} />;
      default:
        return <Text>Unknown step</Text>;
    }
  };

  const renderProgressIndicator = () => {
    const steps = ["Details", "Images", "Facilities"];
    return (
      <View style={styles.progressContainer}>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep >= stepNumber;
          return (
            <View style={styles.stepItem} key={stepNumber}>
              <View style={[styles.stepCircle, isActive && styles.activeStep]}>
                <Text style={styles.stepNumber}>{stepNumber}</Text>
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
              {stepNumber < steps.length && (
                <View style={styles.progressLine} />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏝️ Add New Tourism Place</Text>
      {renderProgressIndicator()}

      {isSubmitting ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Submitting tourism place...</Text>
        </View>
      ) : (
        <View style={styles.card}>{renderStep()}</View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eef3f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    flexWrap: "wrap",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#007bff",
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "bold",
  },
  stepLabel: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#444",
  },
  progressLine: {
    width: 24,
    height: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
});
