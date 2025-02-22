"use client";

import { fetchOffers } from "@/services/dashboardService";
import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
  price: number;
}

export default function OffersTable() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // ✅ Start loading
      try {
        const data = await fetchOffers(page, rowsPerPage);
        setOffers(data?.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    }
    fetchData();
  }, [page, rowsPerPage]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setPage(1);
  };

  const filteredOffers = offers?.filter(
    (offer) =>
      offer?.user_name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "all" || offer.status === filterStatus)
  );

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" pb={3}>
        Offer List
      </Typography>
      <Box sx={{ borderBottom: "1px solid #919EAB29", mb: 1 }}>
        <Tabs
          value={filterStatus || ""}
          onChange={(_e, newValue) => setFilterStatus(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="All" value="all" />
          <Tab label="Accepted" value="accepted" />
        </Tabs>
      </Box>

      {/* Search & Filter */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "500px" }}
        />
        <FormControl margin="normal">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ width: "200px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow sx={{ height: 380 }}>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} color="secondary" />
                </TableCell>
              </TableRow>
            ) : filteredOffers.length > 0 ? (
              filteredOffers?.map((offer) => (
                <TableRow key={offer?.id}>
                  <TableCell>
                    {offer?.user_name}
                    <br />
                    <small style={{ color: "#919EAB" }}>{offer?.email}</small>
                  </TableCell>
                  <TableCell>{offer?.phone || "N/A"}</TableCell>
                  <TableCell>{offer?.company || "N/A"}</TableCell>
                  <TableCell>{offer?.jobTitle || "N/A"}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {offer?.type}
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        backgroundColor:
                          offer?.status === "accepted"
                            ? "#22C55E29"
                            : offer?.status === "rejected"
                            ? "#FF563029"
                            : "#FFAB0029",
                        color:
                          offer?.status === "accepted"
                            ? "#118D57"
                            : offer?.status === "rejected"
                            ? "#B71D18"
                            : "#B76E00",
                        fontWeight: "bold",
                      }}
                    >
                      {offer?.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No offers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={40}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Card>
  );
}
