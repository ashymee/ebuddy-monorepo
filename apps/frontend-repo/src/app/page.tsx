"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { User } from "@repo/entities/user";
import { fetchUserData } from "@stores/action";
import { useRouter } from "next/navigation"; // for redirect
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, isUserDataVisible } = useSelector((state: any) => state);
  const [userData, setUserData] = useState<User[] | null>(null);
  const router = useRouter(); // For navigation

  useEffect(() => {
    // Optionally, fetch data on mount or other triggers.
  }, []);

  const handleFetchUserData = async () => {
    dispatch(fetchUserData()); // Set loading to true

    try {
      const response = await fetch(
        "http://localhost:5500/api/users/fetch-user-data",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the token saved in localStorage
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Clear the token from localStorage and redirect to login page
    localStorage.removeItem("token");
    router.push("/login"); // Redirect to login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleFetchUserData}
          sx={{ marginBottom: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Fetch User Data"}
        </Button>

        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{ marginBottom: 2 }}
        >
          Logout
        </Button>
      </Box>

      <Typography variant="h6">User Information:</Typography>

      <Box>
        {userData &&
          userData.map((user, index) => (
            <Box
              sx={{
                marginTop: 2,
                gap: 2,
                boxShadow: 10,
                padding: 4,
                borderRadius: 4,
              }}
              key={index}
            >
              <Typography variant="body1">Name: {user.name}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              {/* Render other user information as needed */}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default HomePage;
