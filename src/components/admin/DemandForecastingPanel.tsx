import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  CloudSun,
  Calendar,
  Layers,
  Wheat,
  ArrowUpRight,
  ShieldCheck,
  Send,
  Loader2,
  Info,
  Clock,
  MapPin,
  RefreshCw,
  PackageCheck,
  Scale,
} from 'lucide-react';

export const DemandForecastingPanel: React.FC = () => {
  const {
    t,
    demandForecast,
    isForecastingLoading,
    runAIDemandForecast,
    allocateHarvestQuota,
  } = useApp();

  const [selectedWeather, setSelectedWeather] = useState('Clear & Sunny (24°C)');
  const [selectedEvent, setSelectedEvent] = useState('weekend');
  const [selectedTimeframe, setSelectedTimeframe] = useState('tomorrow');

  const handleRunForecast = () => {
    runAIDemandForecast({
      weather: selectedWeather,
      eventType: selectedEvent,
      timeframe: selectedTimeframe,
    });
  };

  const f = t.forecasting;

  return (
    <div className="space-y-6">
      {/* Hero / Header Card with Gemini Brand */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white rounded-2xl p-6 shadow-md border border-emerald-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {f.badge}
              </span>
              <span className="text-emerald-300 text-xs font-mono">
                Model: gemini-3.8-flash
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              {f.title}
            </h2>
            <p className="text-emerald-100/80 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              {f.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="run-ai-demand-forecast-btn"
              onClick={handleRunForecast}
              disabled={isForecastingLoading}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer ${
                isForecastingLoading
                  ? 'bg-emerald-700/60 text-emerald-200 cursor-not-allowed'
                  : 'bg-amber-400 hover:bg-amber-300 text-emerald-950 hover:shadow-lg'
              }`}
            >
              {isForecastingLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                  <span>{f.runningAi}</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>{f.runForecastBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulation Context Controls */}
        <div className="mt-6 pt-4 border-t border-emerald-700/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-emerald-200 text-2xs font-semibold mb-1 flex items-center gap-1">
              <CloudSun className="w-3 h-3 text-amber-300" />
              {f.filterWeather}
            </label>
            <select
              id="forecast-weather-select"
              value={selectedWeather}
              onChange={(e) => setSelectedWeather(e.target.value)}
              className="w-full bg-emerald-950/70 border border-emerald-600/50 rounded-lg px-2.5 py-1.5 text-white text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              <option value="Clear & Sunny (24°C)">Clear & Sunny (24°C) - Favorable</option>
              <option value="Heavy Morning Rain (Monsoon)">Heavy Morning Rain (Monsoon)</option>
              <option value="Festive Fasting Season (Navratri)">Festive Fasting Season (High Potato Demand)</option>
              <option value="Wedding / Catering Surge (Lagun)">Wedding / Catering Surge (High Wheat & Rice)</option>
            </select>
          </div>

          <div>
            <label className="block text-emerald-200 text-2xs font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-300" />
              {f.filterEvent}
            </label>
            <select
              id="forecast-event-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full bg-emerald-950/70 border border-emerald-600/50 rounded-lg px-2.5 py-1.5 text-white text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              <option value="weekend">Upcoming Weekend Morning Household Rush</option>
              <option value="normal">Standard Weekday Routine</option>
              <option value="festive">Community Temple Feast (Bhandara)</option>
              <option value="wedding">Local Marriage Catering Block Booking</option>
            </select>
          </div>

          <div>
            <label className="block text-emerald-200 text-2xs font-semibold mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-300" />
              {f.filterTimeframe}
            </label>
            <select
              id="forecast-timeframe-select"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full bg-emerald-950/70 border border-emerald-600/50 rounded-lg px-2.5 py-1.5 text-white text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              <option value="tomorrow">Tomorrow Morning Route (6:30 AM - 9:30 AM)</option>
              <option value="3_days">Upcoming 3-Day Lookahead</option>
              <option value="7_days">7-Day Weekly Mandi Aggregate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Analytics Bar */}
      {demandForecast && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center justify-between">
              <span>{f.confidence}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">
              {demandForecast.confidenceScore}%
            </div>
            <div className="text-2xs text-stone-500 mt-0.5">
              Verified by Sehore APMC Historical Flow
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center justify-between">
              <span>Market Velocity</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-lg font-bold text-stone-900 truncate">
              {demandForecast.marketSentiment}
            </div>
            <div className="text-2xs text-stone-500 mt-0.5">
              {demandForecast.forecastDate}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center justify-between">
              <span>Total Demand Projected</span>
              <Scale className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-700">
              {demandForecast.cropForecasts.reduce((acc, c) => acc + c.predictedDemandKg, 0)} kg
            </div>
            <div className="text-2xs text-stone-500 mt-0.5">
              Across 4 staples (Potatoes, Rice, Onion, Wheat)
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
            <div className="text-2xs font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center justify-between">
              <span>Harvest Dispatch Target</span>
              <Clock className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-900">
              5:30 AM - 6:15 AM
            </div>
            <div className="text-2xs text-stone-500 mt-0.5">
              Strictly prior to 6:30 AM locality route
            </div>
          </div>
        </div>
      )}

      {/* Summary Narrative */}
      {demandForecast?.summary && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3 shadow-2xs">
          <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm text-emerald-900">
              Gemini Demand Intelligence Summary
            </div>
            <p className="leading-relaxed text-emerald-800">
              {demandForecast.summary}
            </p>
            {demandForecast.weatherImpact && (
              <p className="text-2xs text-emerald-700 italic pt-1 border-t border-emerald-200/60 flex items-center gap-1">
                <CloudSun className="w-3 h-3 text-amber-600" />
                <span><strong>Agrometeorology note:</strong> {demandForecast.weatherImpact}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* CROP FORECAST CARDS (Potatoes, Rice, Onion, Wheat) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            {f.cropBreakdown}
          </h3>
          <span className="text-2xs text-stone-500">
            Automated stock reconciliation against Sehore hub
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demandForecast?.cropForecasts.map((crop) => {
            const hasDeficit = crop.deficitKg > 0;
            const percentageCovered = Math.min(
              100,
              Math.round((crop.currentStockKg / crop.predictedDemandKg) * 100)
            );

            return (
              <div
                key={crop.cropName}
                id={`forecast-card-${crop.cropName.toLowerCase()}`}
                className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-stone-900 text-base">
                        {crop.cropName}
                      </h4>
                      <span className="text-xs text-stone-500 font-medium">
                        {crop.hindiName}
                      </span>
                    </div>
                    <div className="text-2xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <ArrowUpRight className="w-3 h-3" />
                      +{crop.changePercent}% demand shift
                    </div>
                  </div>

                  {crop.urgency === 'critical' ? (
                    <span className="px-2 py-0.5 rounded-full text-2xs font-bold bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {f.urgencyCritical}
                    </span>
                  ) : crop.urgency === 'high' ? (
                    <span className="px-2 py-0.5 rounded-full text-2xs font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {f.urgencyHigh}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-2xs font-bold bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {f.urgencyNormal}
                    </span>
                  )}
                </div>

                {/* Demand vs Current Stock Progress Bar */}
                <div>
                  <div className="flex justify-between text-2xs mb-1">
                    <span className="text-stone-600">
                      {f.currentStock}: <strong>{crop.currentStockKg} kg</strong>
                    </span>
                    <span className="font-bold text-stone-900">
                      {f.predictedDemand}: {crop.predictedDemandKg} kg
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        percentageCovered >= 100
                          ? 'bg-emerald-500'
                          : percentageCovered >= 70
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${percentageCovered}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-2xs text-stone-500 mt-1">
                    <span>{percentageCovered}% stock buffer covered</span>
                    {hasDeficit ? (
                      <span className="font-bold text-red-700">
                        {f.deficit}: -{crop.deficitKg} kg
                      </span>
                    ) : (
                      <span className="font-bold text-green-700">
                        Zero deficit (+{crop.currentStockKg - crop.predictedDemandKg} kg buffer)
                      </span>
                    )}
                  </div>
                </div>

                {/* Grade-wise Predicted Demand */}
                <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-100 text-2xs">
                  <div className="text-stone-500 font-bold mb-1.5">Grade Breakdown Forecast:</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-1.5 rounded border border-stone-200">
                      <div className="font-bold text-emerald-800">Grade A</div>
                      <div className="font-extrabold text-stone-800">{crop.gradeBreakdown.A} kg</div>
                      <div className="text-3xs text-stone-400">Premium household</div>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-stone-200">
                      <div className="font-bold text-amber-800">Grade B</div>
                      <div className="font-extrabold text-stone-800">{crop.gradeBreakdown.B} kg</div>
                      <div className="text-3xs text-stone-400">Catering / daily</div>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-stone-200">
                      <div className="font-bold text-stone-600">Grade C</div>
                      <div className="font-extrabold text-stone-800">{crop.gradeBreakdown.C} kg</div>
                      <div className="text-3xs text-stone-400">Budget processing</div>
                    </div>
                  </div>
                </div>

                {/* Recommended Action & Fair Price Guidance */}
                <div className="pt-2 border-t border-stone-100 text-2xs space-y-1.5">
                  <div className="flex items-start gap-1.5 text-stone-700">
                    <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Action:</strong> {crop.recommendedAction}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600 pt-1">
                    <span>Fair Mandi Price Target:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {crop.fairPriceGuidance}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FARMER HARVEST QUOTA ALLOCATIONS */}
      <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-emerald-700" />
              {f.quotaAllocation}
            </h3>
            <p className="text-2xs text-stone-500 mt-0.5">
              AI calculates precise morning harvest quantities so farmers only harvest what the locality will consume tomorrow.
            </p>
          </div>
          <span className="text-2xs font-semibold px-2 py-1 rounded bg-stone-100 text-stone-700 shrink-0">
            Tomorrow Route: 6:30 AM - 9:30 AM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {demandForecast?.farmerQuotas.map((quota) => (
            <div
              key={quota.farmerId}
              id={`farmer-quota-card-${quota.farmerId}`}
              className={`p-3.5 rounded-xl border transition-all ${
                quota.allocated
                  ? 'bg-green-50/70 border-green-300'
                  : 'bg-stone-50/70 border-stone-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <span>{quota.farmerName}</span>
                    <span className="text-2xs font-normal text-stone-500">
                      ({quota.village})
                    </span>
                  </div>
                  <div className="text-2xs font-semibold text-emerald-800">
                    Crop: {quota.crop}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-emerald-700">
                    {quota.recommendedHarvestKg} kg
                  </span>
                  <div className="text-3xs text-stone-500">
                    {quota.cratesNeeded} Plastic Crates
                  </div>
                </div>
              </div>

              <div className="text-2xs text-stone-600 bg-white p-2 rounded-md border border-stone-100 mb-2.5">
                <div className="flex items-center gap-1 text-stone-500 mb-0.5">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Harvest Ready Target: <strong>{quota.suggestedReadyTime}</strong></span>
                </div>
                <div className="text-stone-600 italic">"{quota.reason}"</div>
              </div>

              <div className="flex items-center justify-between pt-1">
                {quota.allocated ? (
                  <span className="text-2xs font-bold text-green-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    {f.quotaAllocated}
                  </span>
                ) : (
                  <button
                    id={`allocate-quota-btn-${quota.farmerId}`}
                    onClick={() =>
                      allocateHarvestQuota(quota.farmerId, quota.crop, quota.recommendedHarvestKg)
                    }
                    className="w-full py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {f.allocateQuotaBtn}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRATEGIC MANDI ADVISORIES */}
      {demandForecast?.strategicAdvisories && demandForecast.strategicAdvisories.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs">
          <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Wheat className="w-3.5 h-3.5 text-emerald-700" />
            {f.strategicAdvisories}
          </h3>
          <div className="space-y-2">
            {demandForecast.strategicAdvisories.map((advisory, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-2xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{advisory}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
