import { API_BASE_URL, fetchData } from "@/services/apiService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  plan_type: z.enum(["pay_as_you_go", "monthly", "yearly"], {
    required_error: "Plan type is required",
  }),
  additions: z.array(z.enum(["refundable", "on_demand", "negotiable"])),
  user_id: z
    .number({ invalid_type_error: "User is required" })
    .min(1, "User is required"),
  expired: z.string().min(1, "Expiration date is required"),
  price: z.preprocess(
    (val) => (val ? parseFloat(val as string) : undefined),
    z
      .number({ invalid_type_error: "Price must be a valid number" })
      .min(0, "Price must be a positive number")
  ),
});

const OnboardingOfferForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      plan_type: "monthly",
      additions: [],
      user_id: 0,
      expired: "",
      price: 0,
    },
  });

  const additions = [
    {
      label: "Refundable",
      value: "refundable",
    },
    {
      label: "On Demand",
      value: "on_demand",
    },
    {
      label: "Negotiable",
      value: "negotiable",
    },
  ];

  const [response, setResponse] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetchData("users", {
          page: "1",
          per_page: "100",
        });
        setUsers(response?.data || []);
      } catch {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const resetFields = () => {
    resetField("plan_type");
    resetField("additions");
    resetField("user_id");
    resetField("expired");
    resetField("price");
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer fake-jwt-token`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create offer");
      setResponse("Offer created successfully");
      resetFields();
      router.replace("/");
    } catch {
      setResponse("Failed to create offer");
    }
    setOpenSnackbar(true);
  };

  return (
    <>
      <Box sx={{ maxWidth: 720, mx: "auto", mt: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="h6">Create Offer</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Send onboarding offer to new user
              </Typography>
              <Divider sx={{ mt: 3, mb: 2 }} />
              <FormControl fullWidth margin="normal" error={!!errors.plan_type}>
                <FormLabel sx={{ color: "text.primary" }}>Plan Type</FormLabel>
                <Controller
                  name="plan_type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="pay_as_you_go"
                        control={<Radio />}
                        label="Pay As You Go"
                      />
                      <FormControlLabel
                        value="monthly"
                        control={<Radio />}
                        label="Monthly"
                      />
                      <FormControlLabel
                        value="yearly"
                        control={<Radio />}
                        label="Yearly"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <FormLabel
                  sx={{
                    color: "text.primary",
                  }}
                >
                  Additions
                </FormLabel>
                <Box display="flex" gap={2}>
                  {additions?.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Controller
                          name="additions"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value.includes(
                                option.value as
                                  | "refundable"
                                  | "on_demand"
                                  | "negotiable"
                              )}
                              onChange={(e) => {
                                setValue(
                                  "additions",
                                  e.target.checked
                                    ? [
                                        ...field?.value,
                                        option.value as
                                          | "refundable"
                                          | "on_demand"
                                          | "negotiable",
                                      ]
                                    : field?.value.filter(
                                        (i) => i !== option.value
                                      )
                                );
                              }}
                            />
                          )}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </Box>
              </FormControl>
              {errors.additions && (
                <Typography variant="body2" color="error">
                  {errors.additions.message}
                </Typography>
              )}
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) => setValue("user_id", value?.id || 0)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User"
                        fullWidth
                        margin="normal"
                        error={!!errors.user_id}
                        helperText={!!errors.user_id && errors.user_id?.message}
                      />
                    )}
                    sx={{ mt: 3 }}
                    loading={loading}
                  />
                )}
              />
              <Controller
                name="expired"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expired"
                    type="date"
                    fullWidth
                    margin="normal"
                    error={!!errors.expired}
                    helperText={errors.expired?.message}
                    sx={{ mb: 3 }}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </CardContent>
          </Card>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              ml: "auto",
              display: "block",
              backgroundColor: "black",
              padding: "12px 16px",
            }}
          >
            Send Offer
          </Button>
        </form>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={response.includes("successfully") ? "success" : "error"}
        >
          {response}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OnboardingOfferForm;
