"use client";

import axios from "axios";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/Select";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Button } from "./Button";
import Loader from "./Loader";

const COLORS = ["#3b82f6", "#ec4899", "#f97316", "#a855f7", "#10b981"];

export default function DashBoard() {
  const [input, setInput] = useState("Image");
  const [browserData, setBrowserData] = useState<
    { name: string; value: number }[]
  >([]);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // New state variables for metrics
  const [averageEngagementRate, setAverageEngagementRate] = useState("N/A");
  const [totalInteractions, setTotalInteractions] = useState("N/A");
  const [completionRate, setCompletionRate] = useState("N/A");
  const [swipeThroughRate, setSwipeThroughRate] = useState("N/A");

  const extractMetrics = (data: string) => {
    // Extract metrics from the response text
    const engagementRateMatch = data.match(
      /Average engagement rate:\s*([\d.]+)%/
    );
    const totalInteractionsMatch = data.match(/Total interactions:\s*([\d,]+)/);
    const completionRateMatch = data.match(/Completion rate:\s*([\d.]+)%/);
    const swipeThroughRateMatch = data.match(/Swipe-through rate:\s*([\d.]+)%/);

    setAverageEngagementRate(
      engagementRateMatch ? engagementRateMatch[1] : "N/A"
    );
    setTotalInteractions(
      totalInteractionsMatch ? totalInteractionsMatch[1] : "N/A"
    );
    setCompletionRate(completionRateMatch ? completionRateMatch[1] : "N/A");
    setSwipeThroughRate(
      swipeThroughRateMatch ? swipeThroughRateMatch[1] : "N/A"
    );
  };

  const extractRecommendations = (text: string) => {
    console.log("Extracting recommendations from:", text);
    // Extract recommendations using regex
    const recommendationsMatch = text.match(/(?<=\d\.\s).+/g);
    setRecommendations(recommendationsMatch || []);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/langflowclient", {
        inputValue: input,
      });

      const responseText = res.data;
      setResData(JSON.stringify(res.data)); // Assume the API returns text content directly
      extractRecommendations(res.data);

      // Call the new extractMetrics function
      extractMetrics(res.data);
      console.log("API response text:", responseText);

      // Extract pie chart data based on input
      if (input === "Image") extractImageData(responseText);
      else if (input === "Reels") extractReelData(responseText);
      else if (input === "Video") extractVideoData(responseText);
      else if (input === "Carousel") extractCarouselData(responseText);

      if (input === "Image") extractImageContentDataBar(responseText);
      else if (input === "Reels") extractReelContentDataBar(responseText);
      else if (input === "Video") extractVideoContentDataBar(responseText);
      else if (input === "Carousel") extractCarouselContentDataBar(responseText);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractVideoContentData = (data: string) => {
    const regex = /Educational content: (\d+\.\d+)% engagement rate|Entertainment content: (\d+\.\d+)% engagement rate|Promotional content: (\d+\.\d+)% engagement rate/g;
    setChartData(
      extractDataUsingRegex(data, regex, ["Educational", "Entertainment", "Promotional"])
    );
  };

  const extractImageContentData = (data: string) => {
    const regex = /Text-based images: (\d+\.\d+)% engagement rate|Visual images: (\d+\.\d+)% engagement rate|Interactive images: (\d+\.\d+)% engagement rate/g;
    setChartData(
      extractDataUsingRegex(data, regex, ["Text-based", "Visual", "Interactive"])
    );
  };

  const extractDataUsingRegexBar = (data: string, regex: RegExp, labels: string[]) => {
    const newChartData: { name: string; value: number }[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(data)) !== null) {
      labels.forEach((label, index) => {
        if (match![index + 1]) {
          newChartData.push({ name: label, value: parseFloat(match![index + 1]) });
        }
      });
    }
    return newChartData;
  };

  const extractVideoContentDataBar = (data: string) => {
    const regex = /Educational content: (\d+\.\d+)% engagement rate|Entertainment content: (\d+\.\d+)% engagement rate|Promotional content: (\d+\.\d+)% engagement rate/g;
    setChartData(
      extractDataUsingRegexBar(data, regex, ["Educational", "Entertainment", "Promotional"])
    );
  };

  const extractImageContentDataBar = (data: string) => {
    const regex = /Text-based images: (\d+\.\d+)% engagement rate|Visual images: (\d+\.\d+)% engagement rate|Interactive images: (\d+\.\d+)% engagement rate/g;
    setChartData(
      extractDataUsingRegexBar(data, regex, ["Text-based", "Visual", "Interactive"])
    );
  };


  const extractReelContentDataBar = (data: string) => {
    const regex = /Music-based Reels: (\d+\.\d+)% engagement rate|Dance-based Reels: (\d+\.\d+)% engagement rate|Comedy-based Reels: (\d+\.\d+)% engagement rate/g;
    setChartData(
      extractDataUsingRegexBar(data, regex, ["Music-based", "Dance-based", "Comedy-based"])
    );
  };

  const extractCarouselContentDataBar = (data: string) => {
    const regex = /Visual content: (\d+\.\d+)% engagement rate|Text-based content: (\d+\.\d+)% engagement rate|Interactive content: (\d+\.\d+)% engagement rate/g;
    setChartData(
      extractDataUsingRegexBar(data, regex, ["Visual", "Text-based", "Interactive"])
    );
  };

  const extractDataUsingRegex = (
    data: string,
    regex: RegExp,
    labels: string[]
  ) => {
    const newBrowserData: { name: string; value: number }[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(data)) !== null) {
      labels.forEach((label, index) => {
        if (match![index + 1]) {
          newBrowserData.push({
            name: label,
            value: parseFloat(match![index + 1]),
          });
        }
      });
    }
    return newBrowserData;
  };

  const extractImageData = (data: string) => {
    const regex =
      /Small images \(less than 500x500 pixels\): (\d+\.\d+)% engagement rate|Medium images \(500x500-1000x1000 pixels\): (\d+\.\d+)% engagement rate|Large images \(more than 1000x1000 pixels\): (\d+\.\d+)% engagement rate/g;
    setBrowserData(
      extractDataUsingRegex(data, regex, ["Small", "Medium", "Large"])
    );
  };

  const extractReelData = (data: string) => {
    const regex =
      /Short Reels \(less than 60 seconds\): (\d+\.\d+)% engagement rate|Medium Reels \(60-120 seconds\): (\d+\.\d+)% engagement rate|Long Reels \(more than 120 seconds\): (\d+\.\d+)% engagement rate/g;
    setBrowserData(
      extractDataUsingRegex(data, regex, ["Short", "Medium", "Long"])
    );
  };

  const extractVideoData = (data: string) => {
    const regex =
      /Short videos \(less than 60 seconds\): (\d+\.\d+)% engagement rate|Medium videos \(60-120 seconds\): (\d+\.\d+)% engagement rate|Long videos \(more than 120 seconds\): (\d+\.\d+)% engagement rate/g;
    setBrowserData(
      extractDataUsingRegex(data, regex, ["Short", "Medium", "Long"])
    );
  };

  const extractCarouselData = (data: string) => {
    const regex =
      /Short carousels \(less than 5 slides\): (\d+\.\d+)% engagement rate|Medium carousels \(5-10 slides\): (\d+\.\d+)% engagement rate|Long carousels \(more than 10 slides\): (\d+\.\d+)% engagement rate/g;
    setBrowserData(
      extractDataUsingRegex(data, regex, ["Short", "Medium", "Long"])
    );
  };

  return (
    <div className={`min-h-screen bg-zinc-950 text-white p-8 `}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="flex flex-col items-center gap-4">
            <Loader />
            <p className="text-xl">Loading Please Wait</p>
          </div>
        </div>
      )}
      <div
        className={`max-w-7xl mx-auto space-y-8 relative ${
          loading ? "blur-sm" : ""
        }`}
      >
        <Select onValueChange={setInput}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reels">Reels</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Image">Image</SelectItem>
            <SelectItem value="Carousel">Carousel</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>Search</Button>
        {/* {input} */}

        <h1 className="text-3xl font-bold">Analytics Report</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Average Engagement Rate</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{averageEngagementRate}%</div>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Total Interactions</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{totalInteractions}</div>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Completion Rate</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{completionRate}%</div>
            </div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Swipe-through Rate</h3>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{swipeThroughRate}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overview Chart */}

          <div className="bg-zinc-900 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Content Engagement Rates</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

          {/* Recent Sales */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Recommendations</h3>
            <div className="space-y-4">
              <ul className="list-disc pl-6">
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Browser Distribution */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              Engagement Rate Distribution
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {browserData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {browserData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
