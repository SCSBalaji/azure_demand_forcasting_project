from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(title="Azure Demand Forecasting API")

# Add CORS middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = "data/processed/cleaned_merged.csv"
df = pd.read_csv(DATA_PATH, parse_dates=['date'])

@app.get("/api/usage-trends")
def usage_trends():
    """Get CPU usage trends grouped by date and region"""
    trends = (
        df.groupby(['date', 'region'])['usage_cpu']
        .mean()
        .reset_index()
        .sort_values(['date', 'region'])
    )
    return trends.to_dict(orient='records')

@app.get("/api/top-regions")
def top_regions():
    """Get top 5 regions by total CPU usage"""
    region_sums = (
        df.groupby('region')['usage_cpu']
        .sum()
        .sort_values(ascending=False)
        .head(5)
        .reset_index()
        .rename(columns={'usage_cpu': 'total_cpu_usage'})
    )
    return region_sums.to_dict(orient='records')

@app.get("/api/raw-data")
def raw_data():
    """Get all raw data from cleaned_merged.csv"""
    return df.to_dict(orient='records')

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "Azure Demand Forecasting API is running",
        "data_loaded": len(df),
        "columns": list(df.columns)
    }

@app.get("/")
def root():
    return {"message": "Welcome to the Azure Demand Forecasting API!"}