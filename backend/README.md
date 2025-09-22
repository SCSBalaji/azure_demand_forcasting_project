## Backend API Usage

1. **Install dependencies:**
    ```bash
    pip install fastapi uvicorn pandas
    ```

2. **Run the API server:**
    ```bash
    uvicorn backend.main:app --reload
    ```

3. **Available Endpoints:**
    - `/api/usage-trends` — Returns CPU usage trends per region (JSON)
    - `/api/top-regions` — Returns top 5 regions by total CPU demand (JSON)
    - `/api/raw-data` — Returns the full cleaned dataset (JSON)

4. **Interactive API docs:**  
   Visit [http://localhost:8000/docs](http://localhost:8000/docs) after running the server.