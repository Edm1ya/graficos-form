        // Clase para manejar el sistema de ventas y gráficos
        class SalesChartManager {
            constructor() {
                this.salesData = {
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                    sales: [4000, 3000, 5000, 4500, 6000, 5500]
                };

                this.chartContext = document.getElementById('salesChart').getContext('2d');
                this.salesForm = document.getElementById('salesForm');
                this.monthInput = document.getElementById('month');
                this.salesInput = document.getElementById('sales');
                this.salesTableBody = document.getElementById('salesTableBody');

                this.initializeChart();
                this.updateSalesTable();
                this.setupEventListeners();
            }

            initializeChart() {
                this.chart = new Chart(this.chartContext, {
                    type: 'bar',
                    data: {
                        labels: this.salesData.months,
                        datasets: [{
                            label: 'Ventas Mensuales',
                            data: this.salesData.sales,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Monto de Ventas'
                                }
                            }
                        }
                    }
                });
            }

            setupEventListeners() {
                this.salesForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.processNewSale();
                });

                this.salesTableBody.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-btn')) {
                        const monthToDelete = e.target.getAttribute('data-month');
                        this.deleteSale(monthToDelete);
                    }
                });
            }

            processNewSale() {
                const month = this.monthInput.value.trim();
                const sales = parseFloat(this.salesInput.value);

                // Validar entrada
                if (!month || isNaN(sales)) {
                    alert('Por favor ingrese datos válidos');
                    return;
                }

                // Buscar índice del mes
                const monthIndex = this.salesData.months.findIndex(
                    m => m.toLowerCase() === month.toLowerCase()
                );

                if (monthIndex !== -1) {
                    // Actualizar mes existente
                    this.salesData.sales[monthIndex] = sales;
                } else {
                    // Agregar nuevo mes
                    this.salesData.months.push(month);
                    this.salesData.sales.push(sales);
                }

                // Actualizar gráfico y tabla
                this.updateChart();
                this.updateSalesTable();

                // Limpiar formulario
                this.monthInput.value = '';
                this.salesInput.value = '';
            }

            deleteSale(monthToDelete) {
                // Encontrar índice del mes a eliminar
                const monthIndex = this.salesData.months.findIndex(
                    m => m.toLowerCase() === monthToDelete.toLowerCase()
                );

                if (monthIndex !== -1) {
                    // Eliminar mes de los arreglos
                    this.salesData.months.splice(monthIndex, 1);
                    this.salesData.sales.splice(monthIndex, 1);

                    // Actualizar gráfico y tabla
                    this.updateChart();
                    this.updateSalesTable();
                }
            }

            updateChart() {
                this.chart.data.labels = this.salesData.months;
                this.chart.data.datasets[0].data = this.salesData.sales;
                this.chart.update();
            }

            updateSalesTable() {
                // Limpiar tabla existente
                this.salesTableBody.innerHTML = '';

                // Llenar tabla con nuevos datos
                this.salesData.months.forEach((month, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${month}</td>
                        <td>$${this.salesData.sales[index].toLocaleString()}</td>
                        <td>
                            <button class="delete-btn" data-month="${month}">
                                Eliminar
                            </button>
                        </td>
                    `;
                    this.salesTableBody.appendChild(row);
                });
            }
        }

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', () => {
            new SalesChartManager();
        });