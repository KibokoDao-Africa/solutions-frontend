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
} from "@mui/material";
import axios from "axios";

const SolutionsForm = ({ open, handleClose, solutionType }) => {
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSell = solutionType === "sell";
  const isRequest = solutionType === "request";
  const isVolunteer = solutionType === "volunteer";

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        solution_type: solutionType,
        description,
        terms: terms || null,
        ...(isSell && { amount_to_charge: parseFloat(amount) }),
        ...(isRequest && { amount_willing_to_pay: parseFloat(amount) }),
      };

      await axios.post("http://localhost:8000/api/solutions/", payload);
      alert("Solution submitted successfully!");
      handleClose();
    } catch (err) {
      setError("Failed to submit the solution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{`Create a ${solutionType} Solution`}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
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
          rows={3}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Terms (optional)"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          multiline
          rows={2}
          margin="normal"
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
          />
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !description || ((isSell || isRequest) && !amount)}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SolutionsForm;
