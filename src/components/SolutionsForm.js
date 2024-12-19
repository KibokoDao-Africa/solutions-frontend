import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const SolutionsForm = ({ open, handleClose, solutionType, userId, onSubmit }) => {
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSell = solutionType === "sell";
  const isRequest = solutionType === "request";
  const isVolunteer = solutionType === "volunteer";

  const handleFormSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construct the payload
      const payload = {
        solution_type: solutionType,
        description,
        terms: terms || null,
        ...(isSell && { amount_to_charge: parseFloat(amount) }),
        ...(isRequest && { amount_willing_to_pay: parseFloat(amount) }),
        user_id: userId,
      };

      // Delegate to the onSubmit function provided by the parent component
      await onSubmit(payload);

      alert("Solution submitted successfully!");
      handleClose();
    } catch (err) {
      console.error("Error submitting solution:", err);
      setError("Failed to submit the solution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#9b51e0" }}>
        {`Create a ${solutionType} Solution`}
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary">
            {isVolunteer
              ? "Provide a description of your volunteering offer."
              : "Fill in the details of your solution, including the description and terms."}
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          margin="normal"
          required
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          fullWidth
          label="Terms (optional)"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          multiline
          rows={3}
          margin="normal"
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
        />
        {(isSell || isRequest) && (
          <TextField
            fullWidth
            label={isSell ? "Amount to Charge" : "Amount Willing to Pay"}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            required
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Ensure all information is correct before submission.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 3 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{
            backgroundColor: "#ff6900",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#e85e00",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !description || ((isSell || isRequest) && !amount)}
          sx={{
            backgroundColor: "#9b51e0",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#7a3da1",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SolutionsForm;
