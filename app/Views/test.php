<div class="nk-content ">
	<div class="container-fluid">
		<div class="nk-content-inner">
			<div class="nk-content-body">
				<div class="nk-block-head nk-block-head-sm">
					<div class="nk-block-between">
						<div class="nk-block-head-content">
							<h3 class="nk-block-title page-title">Dashboard</h3>
						</div>
						<!-- .nk-block-head-content -->  
					</div>
					<!-- .nk-block-between -->
				</div>
				<!-- .nk-block-head -->
				<div class="nk-block">
					<div class="row g-gs">

                    <div class="col-md-6 col-xxl-3">
    <div class="card h-100">
        <div class="card-inner">
            <div class="card-title-group">
                <div class="card-title card-title-sm">
                    <h6 class="title">Status kutipan mengikut Negeri</h6>
                </div>
                <div class="card-tools">
                    <div class="dropdown">
                        <a href="#" class="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white" data-bs-toggle="dropdown" id="dropdownMenuButton">Select Country</a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-xs">
                            <ul class="link-list-opt no-bdr">
                                <li><a href="#" class="dropdown-item" data-country="United States"><span>United States</span></a></li>
                                <li><a href="#" class="dropdown-item" data-country="India"><span>India</span></a></li>
                                <li><a href="#" class="dropdown-item" data-country="Turkey"><span>Turkey</span></a></li>
                                <li><a href="#" class="dropdown-item" data-country="Bangladesh"><span>Bangladesh</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="analytics-map">
                <!-- Placeholder for table -->
                <div id="countryTable">
                    <table class="analytics-map-data-list" id="dataList">
                        <!-- Table data goes here -->
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    // Add an event listener to each dropdown item
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
            // Prevent default link behavior
            event.preventDefault();
            // Get the selected country
            const selectedCountry = item.getAttribute('data-country');
            // Update the dropdown button text
            document.getElementById('dropdownMenuButton').textContent = selectedCountry;
            // Here you can add logic to fetch and display data for the selected country
            // For simplicity, let's just update the table with a placeholder
            updateCountryTable(selectedCountry);
        });
    });

    // Function to update country table (placeholder function)
    function updateCountryTable(selectedCountry) {
        // Replace this with your actual logic to update table data for the selected country
        const table = document.getElementById('dataList');
        table.innerHTML = `<tr class="analytics-map-data"><td colspan="3">Table data for ${selectedCountry}</td></tr>`;
    }
</script>


                        </div>
					<!-- .row -->
				</div>
				<!-- .nk-block -->
			</div>
		</div>
	</div>
</div>