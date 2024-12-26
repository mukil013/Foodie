import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/client/NavBar";
import { Button } from "@mui/material";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function FoodExpanded() {
  const { foodId } = useParams(); 
  const [food, setFood] = useState(null); 
  const [aiInsight, setAiInsight] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const foodList = JSON.parse(sessionStorage.getItem("foodList")) || [];
    const matchedFood = foodList.find((element) => element._id === foodId);
    setFood(matchedFood); 
  }, [foodId]);

  useEffect(() => {
    const fetchAIInsight = async () => {
      if (food) {
        setLoading(true); 
        try {
          const response = await axios.get(
            `https://foodie-vqll.onrender.com/genai/json/${food.foodName}`
          );
          const insightText = response.data?.candidates[0]?.content?.parts[0]?.text;

          let insightJSON = null;
          if (insightText) {
            try {
              insightJSON = JSON.parse(insightText.replace(/```json|```/g, ""));
            } catch (parseError) {
              console.error("Error parsing AI insight JSON:", parseError);
              throw new Error("Invalid nutritional data format received from AI.");
            }
          }

          if (insightJSON && insightJSON.nutritional_value) {
            setAiInsight(insightJSON);
            setError(""); 
          } else {
            throw new Error("Nutritional data is incomplete or unavailable.");
          }
        } catch (err) {
          setError("Failed to fetch nutritional insights. Please try again.");
          console.error("Error fetching AI insight:", err);
        } finally {
          setLoading(false); 
        }
      }
    };

    fetchAIInsight();
  }, [food]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="p-4 flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-semibold text-gray-500">Loading...</h1>
        </div>
      </>
    );
  }

  if (!food || error) {
    return (
      <>
        <NavBar />
        <div className="p-4 flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-semibold text-gray-500">
            {error || "Food not found."}
          </h1>
        </div>
      </>
    );
  }

  const chartData =
    aiInsight && aiInsight.nutritional_value
      ? {
          labels: Object.keys(aiInsight.nutritional_value),
          datasets: [
            {
              label: "Nutritional Value",
              data: Object.values(aiInsight.nutritional_value).map((item) =>
                typeof item.amount === "number" ? item.amount : 0
              ),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }
      : null;

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-3xl font-semibold my-6">{food.foodName}</h1>
        <div className="w-full h-[50vh] bg-gray-300 rounded-lg p-4">
          <img
            src={food.foodImage || "https://via.placeholder.com/150"}
            alt={food.foodName}
            className="w-full h-full object-contain"
          />
        </div>
        <hr />
        <p className="text-4xl font-bold my-6">Price: ₹{food.foodPrice}/-</p>
        <p className="text-gray-700">
          <b>Description:</b> {food.foodDescription}
        </p>
        {aiInsight && chartData && (
          <div className="h-[60vh] flex justify-center items-center flex-col mt-6 p-4 rounded">
            <h2 className="text-2xl font-semibold mb-4">Nutritional Insights</h2>
            <div className="w-full max-w-md">
              <Doughnut data={chartData} />
            </div>
            <p className="mt-4 text-gray-600">
              <b>Serving Size:</b> {aiInsight.serving_size}
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              <i>{aiInsight.disclaimer}</i>
            </p>
          </div>
        )}
        <div className="mt-4 flex gap-4">
          <Button color="success" variant="contained">
            Buy
          </Button>
          <Button variant="contained">Add to cart</Button>
        </div>
      </div>
    </>
  );
}
