from fastapi import FastAPI, Response
import pandas as pd

app = FastAPI(title="Azure Demand Forecasting API")

DATA_PATH = "data/processed/cleaned_merged.csv"
df = pd.read_csv(DATA_PATH, parse_dates=['date'])

@app.get("/api/usage-trends")
def usage_trends():
    trends = (
        df.groupby(['date', 'region'])['usage_cpu']
        .mean()
        .reset_index()
        .sort_values(['date', 'region'])
    )
    return trends.to_dict(orient='records')

@app.get("/api/top-regions")
def top_regions():
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
    return df.to_dict(orient='records')

    # To download as csv file
    # csv_data = df.to_csv(index=False)
    # return Response(content=csv_data, media_type="text/csv")

@app.get("/")
def root():
    return {"message": "Welcome to the Azure Demand Forecasting API!"}