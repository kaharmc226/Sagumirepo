import math

from fastapi import APIRouter, Query

from app.schemas import ForecastItem, StockForecastResponse

router = APIRouter(tags=["Forecast"])

# Baseline starter data aligned with docs/API_CONTRACT.md §4.4
# Replaced by real DS-06 / DS-07 forecast model in Sprint 3.
_BASELINE_PRODUCTS = [
    ("product-keripik-original", "Keripik Sagu Original", 6.5),
    ("product-keripik-pedas", "Keripik Sagu Pedas", 4.8),
    ("product-bagea-kenari", "Bagea Sagu Kenari", 3.1),
    ("product-brownies-sagu", "Brownies Sagu Panggang", 2.2),
]


@router.get("/forecast/stock", response_model=StockForecastResponse)
def forecast_stock(days: int = Query(default=7, ge=1, le=30)) -> StockForecastResponse:
    items = []
    for product_id, product_name, avg_daily in _BASELINE_PRODUCTS:
        predicted = math.ceil(avg_daily * days)
        recommended = math.ceil(predicted * 1.15)  # 15% safety buffer
        items.append(
            ForecastItem(
                product_id=product_id,
                product_name=product_name,
                avg_daily_sales=avg_daily,
                predicted_demand=predicted,
                recommended_stock=recommended,
            )
        )

    return StockForecastResponse(
        horizon_days=days,
        model_used="moving_average_baseline",
        items=items,
    )

