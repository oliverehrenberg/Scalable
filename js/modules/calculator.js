// ROI Calculator Module
class ROICalculator {
  constructor() {
    this.currentValues = {
      monthlyRevenue: 500000,
      salesTeamSize: 5,
      averageDealSize: 50000,
      conversionRate: 15,
      salesCycleLength: 90,
      marketingBudget: 100000
    };
    
    this.sliders = {};
    this.resultElements = {};
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    this.createCalculatorHTML();
    this.initializeSliders();
    this.bindEvents();
    this.updateResults();
    this.isInitialized = true;
  }

  createCalculatorHTML() {
    const calculatorContainer = document.querySelector('.calculator-content');
    if (!calculatorContainer) return;

    calculatorContainer.innerHTML = `
      <div class="calculator-inputs">
        <h3 class="inputs-title">Anpassa dina parametrar</h3>
        
        <div class="input-group">
          <div class="input-label">
            <span class="label-text">Månadsintäkter (SEK)</span>
            <span class="label-value" id="monthlyRevenueValue">500,000</span>
          </div>
          <div class="slider-container">
            <div class="slider-track" id="monthlyRevenueTrack">
              <div class="slider-fill" id="monthlyRevenueFill"></div>
              <div class="slider-thumb" id="monthlyRevenueThumb"></div>
            </div>
          </div>
          <div class="input-range">
            <span>100,000</span>
            <span>2,000,000</span>
          </div>
          <div class="input-description">
            Din nuvarande månadsintäkt från försäljning
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">
            <span class="label-text">Säljteam-storlek</span>
            <span class="label-value" id="salesTeamSizeValue">5</span>
          </div>
          <div class="slider-container">
            <div class="slider-track" id="salesTeamSizeTrack">
              <div class="slider-fill" id="salesTeamSizeFill"></div>
              <div class="slider-thumb" id="salesTeamSizeThumb"></div>
            </div>
          </div>
          <div class="input-range">
            <span>1</span>
            <span>20</span>
          </div>
          <div class="input-description">
            Antal säljare i ditt team
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">
            <span class="label-text">Genomsnittlig affärsstorlek (SEK)</span>
            <span class="label-value" id="averageDealSizeValue">50,000</span>
          </div>
          <div class="slider-container">
            <div class="slider-track" id="averageDealSizeTrack">
              <div class="slider-fill" id="averageDealSizeFill"></div>
              <div class="slider-thumb" id="averageDealSizeThumb"></div>
            </div>
          </div>
          <div class="input-range">
            <span>10,000</span>
            <span>500,000</span>
          </div>
          <div class="input-description">
            Genomsnittligt värde per affär
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">
            <span class="label-text">Konverteringsgrad (%)</span>
            <span class="label-value" id="conversionRateValue">15%</span>
          </div>
          <div class="slider-container">
            <div class="slider-track" id="conversionRateTrack">
              <div class="slider-fill" id="conversionRateFill"></div>
              <div class="slider-thumb" id="conversionRateThumb"></div>
            </div>
          </div>
          <div class="input-range">
            <span>5%</span>
            <span>50%</span>
          </div>
          <div class="input-description">
            Andel leads som konverterar till kunder
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">
            <span class="label-text">Försäljningscykel (dagar)</span>
            <span class="label-value" id="salesCycleLengthValue">90</span>
          </div>
          <div class="slider-container">
            <div class="slider-track" id="salesCycleLengthTrack">
              <div class="slider-fill" id="salesCycleLengthFill"></div>
              <div class="slider-thumb" id="salesCycleLengthThumb"></div>
            </div>
          </div>
          <div class="input-range">
            <span>30</span>
            <span>365</span>
          </div>
          <div class="input-description">
            Genomsnittlig tid från lead till affär
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">
            <span class="label-text">Marknadsföringsbudget (SEK/månad)</span>
            <span class="label-value" id="marketingBudgetValue">100,000</span>
          </div>
          <div class="slider-container">
            <div class="slider-track" id="marketingBudgetTrack">
              <div class="slider-fill" id="marketingBudgetFill"></div>
              <div class="slider-thumb" id="marketingBudgetThumb"></div>
            </div>
          </div>
          <div class="input-range">
            <span>10,000</span>
            <span>1,000,000</span>
          </div>
          <div class="input-description">
            Din nuvarande månadsbudget för marknadsföring
          </div>
        </div>

        <div class="calculator-actions">
          <div class="action-buttons">
            <button class="btn btn-secondary" id="resetCalculator">Återställ</button>
            <button class="btn btn-primary" id="saveResults">Spara resultat</button>
          </div>
        </div>
      </div>

      <div class="calculator-results">
        <h3 class="results-title">Dina resultat</h3>
        
        <div class="results-grid">
          <div class="result-item">
            <div class="result-label">Nuvarande leads/månad</div>
            <div class="result-value" id="currentLeadsValue">0</div>
            <div class="result-description">Baserat på din nuvarande setup</div>
          </div>
          
          <div class="result-item">
            <div class="result-label">Förväntade leads/månad</div>
            <div class="result-value" id="expectedLeadsValue">0</div>
            <div class="result-description">Med Scalebles optimering</div>
          </div>
          
          <div class="result-item highlight">
            <div class="result-label">Lead generation ökning</div>
            <div class="result-value" id="leadIncreaseValue">0%</div>
            <div class="result-description">Förväntad förbättring</div>
          </div>
          
          <div class="result-item">
            <div class="result-label">Förväntad intäktsökning</div>
            <div class="result-value" id="revenueIncreaseValue">0 SEK</div>
            <div class="result-description">Per månad</div>
          </div>
        </div>

        <div class="roi-summary">
          <div class="summary-title">Förväntad ROI</div>
          <div class="summary-value" id="roiValue">0%</div>
          <div class="summary-description">
            Baserat på investering i Scalebles tjänster och förväntade intäktsökningar
          </div>
        </div>
      </div>
    `;
  }

  initializeSliders() {
    const sliderConfigs = [
      {
        id: 'monthlyRevenue',
        min: 100000,
        max: 2000000,
        step: 50000,
        format: (value) => this.formatNumber(value)
      },
      {
        id: 'salesTeamSize',
        min: 1,
        max: 20,
        step: 1,
        format: (value) => value.toString()
      },
      {
        id: 'averageDealSize',
        min: 10000,
        max: 500000,
        step: 5000,
        format: (value) => this.formatNumber(value)
      },
      {
        id: 'conversionRate',
        min: 5,
        max: 50,
        step: 1,
        format: (value) => `${value}%`
      },
      {
        id: 'salesCycleLength',
        min: 30,
        max: 365,
        step: 5,
        format: (value) => value.toString()
      },
      {
        id: 'marketingBudget',
        min: 10000,
        max: 1000000,
        step: 10000,
        format: (value) => this.formatNumber(value)
      }
    ];

    sliderConfigs.forEach(config => {
      this.createSlider(config);
    });
  }

  createSlider(config) {
    const track = document.getElementById(`${config.id}Track`);
    const fill = document.getElementById(`${config.id}Fill`);
    const thumb = document.getElementById(`${config.id}Thumb`);
    const valueElement = document.getElementById(`${config.id}Value`);

    if (!track || !fill || !thumb || !valueElement) return;

    const slider = {
      track,
      fill,
      thumb,
      valueElement,
      config,
      isDragging: false
    };

    this.sliders[config.id] = slider;

    // Set initial position
    const initialPercentage = this.getPercentageFromValue(this.currentValues[config.id], config.min, config.max);
    this.updateSliderPosition(slider, initialPercentage);

    // Bind events
    track.addEventListener('mousedown', (e) => this.startDragging(e, slider));
    thumb.addEventListener('mousedown', (e) => this.startDragging(e, slider));
    
    document.addEventListener('mousemove', (e) => this.drag(e, slider));
    document.addEventListener('mouseup', () => this.stopDragging(slider));

    // Touch events for mobile
    track.addEventListener('touchstart', (e) => this.startDragging(e, slider));
    thumb.addEventListener('touchstart', (e) => this.startDragging(e, slider));
    
    document.addEventListener('touchmove', (e) => this.drag(e, slider));
    document.addEventListener('touchend', () => this.stopDragging(slider));
  }

  startDragging(e, slider) {
    e.preventDefault();
    slider.isDragging = true;
    slider.thumb.style.cursor = 'grabbing';
  }

  drag(e, slider) {
    if (!slider.isDragging) return;

    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const rect = slider.track.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    
    this.updateSliderPosition(slider, percentage);
    this.updateValueFromPercentage(slider, percentage);
    this.updateResults();
  }

  stopDragging(slider) {
    slider.isDragging = false;
    slider.thumb.style.cursor = 'grab';
  }

  updateSliderPosition(slider, percentage) {
    slider.fill.style.width = `${percentage * 100}%`;
    slider.thumb.style.left = `${percentage * 100}%`;
  }

  updateValueFromPercentage(slider, percentage) {
    const value = Math.round(
      slider.config.min + (slider.config.max - slider.config.min) * percentage
    );
    
    this.currentValues[slider.config.id] = value;
    slider.valueElement.textContent = slider.config.format(value);
  }

  getPercentageFromValue(value, min, max) {
    return (value - min) / (max - min);
  }

  updateResults() {
    const calculations = this.calculateResults();
    
    // Update result elements
    Object.keys(calculations).forEach(key => {
      const element = document.getElementById(`${key}Value`);
      if (element) {
        element.textContent = calculations[key];
      }
    });
  }

  calculateResults() {
    const {
      monthlyRevenue,
      salesTeamSize,
      averageDealSize,
      conversionRate,
      salesCycleLength,
      marketingBudget
    } = this.currentValues;

    // Current leads per month (simplified calculation)
    const currentLeadsPerMonth = Math.round((monthlyRevenue / averageDealSize) / (conversionRate / 100));
    
    // Expected leads with optimization (assume 3x improvement)
    const expectedLeadsPerMonth = Math.round(currentLeadsPerMonth * 3);
    
    // Lead increase percentage
    const leadIncrease = Math.round(((expectedLeadsPerMonth - currentLeadsPerMonth) / currentLeadsPerMonth) * 100);
    
    // Expected revenue increase
    const expectedRevenueIncrease = (expectedLeadsPerMonth - currentLeadsPerMonth) * (conversionRate / 100) * averageDealSize;
    
    // ROI calculation (assume Scaleble investment is 15% of marketing budget)
    const scalebleInvestment = marketingBudget * 0.15;
    const roi = scalebleInvestment > 0 ? Math.round((expectedRevenueIncrease / scalebleInvestment) * 100) : 0;

    return {
      currentLeads: this.formatNumber(currentLeadsPerMonth),
      expectedLeads: this.formatNumber(expectedLeadsPerMonth),
      leadIncrease: `${leadIncrease}%`,
      revenueIncrease: this.formatNumber(Math.round(expectedRevenueIncrease)),
      roi: `${roi}%`
    };
  }

  formatNumber(num) {
    return new Intl.NumberFormat('sv-SE').format(num);
  }

  bindEvents() {
    // Reset button
    const resetBtn = document.getElementById('resetCalculator');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetCalculator());
    }

    // Save results button
    const saveBtn = document.getElementById('saveResults');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveResults());
    }
  }

  resetCalculator() {
    this.currentValues = {
      monthlyRevenue: 500000,
      salesTeamSize: 5,
      averageDealSize: 50000,
      conversionRate: 15,
      salesCycleLength: 90,
      marketingBudget: 100000
    };

    Object.keys(this.sliders).forEach(sliderId => {
      const slider = this.sliders[sliderId];
      const percentage = this.getPercentageFromValue(
        this.currentValues[sliderId],
        slider.config.min,
        slider.config.max
      );
      this.updateSliderPosition(slider, percentage);
      this.updateValueFromPercentage(slider, percentage);
    });

    this.updateResults();
  }

  saveResults() {
    const results = this.calculateResults();
    const data = {
      inputs: this.currentValues,
      results: results,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('scalebleCalculatorResults', JSON.stringify(data));

    // Show success message
    this.showSaveSuccess();
  }

  showSaveSuccess() {
    const saveBtn = document.getElementById('saveResults');
    if (!saveBtn) return;

    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Sparat!';
    saveBtn.classList.add('btn-success');

    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.classList.remove('btn-success');
    }, 2000);
  }

  // Public method to get current results
  getResults() {
    return {
      inputs: this.currentValues,
      results: this.calculateResults()
    };
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const calculator = new ROICalculator();
  
  // Initialize if calculator section exists
  if (document.querySelector('.calculator-section')) {
    calculator.init();
  }

  // Make calculator globally available
  window.scalebleCalculator = calculator;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ROICalculator;
} 