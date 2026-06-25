<!-- Footer -->
    <footer id="contact" class="footer-area">
        <div class="container footer-grid">
            <div class="footer-brand">
                <h4>IGL Potable Spirits</h4>
                <p>A Division of India Glycols Limited</p>
                <small>&copy; 2026 India Glycols Limited. All rights reserved.</small>
            </div>
            <div class="footer-links">
                <h5>Information</h5>
                <a href="#investor-snapshot">Financial Snapshot</a>

                <a href="#portfolio">Brand Portfolio</a>
            </div>
            <div class="footer-contact">
                <h5>Investor Relations</h5>
                <p>Email: ir@indiaglycols.com</p>
                <p>Noida Office: Plot No. 2B, Sector-126, Noida, UP</p>
                <small class="disclaimer">Please enjoy responsibly. For corporate, institutional, and boardroom review only.</small>
            </div>
        </div>
    </footer>

    <!-- Investor Modal -->
    <div class="investor-modal-overlay">
        <div class="investor-modal">
            <button class="modal-close-btn" aria-label="Close modal">&times;</button>
            <div class="modal-header">
                <h3>Request Investor Pack</h3>
                <p>Please enter your professional coordinates below to receive IGL's Potable Spirits division investor kit, analyst logs, and FY26 projections.</p>
            </div>
            <form class="investor-form" id="investorForm">
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" required placeholder="e.g. Vikram Sharma">
                </div>
                <div class="form-group">
                    <label for="corporateEmail">Corporate Email</label>
                    <input type="email" id="corporateEmail" required placeholder="e.g. v.sharma@firmname.com">
                </div>
                <div class="form-group">
                    <label for="firmName">Institution / Firm Name</label>
                    <input type="text" id="firmName" required placeholder="e.g. Trident Asset Management">
                </div>
                <button type="submit" class="btn btn-gold btn-block">Download Investor Pack</button>
            </form>
            <div class="modal-success-message" style="display: none;">
                <div class="success-icon">✓</div>
                <h4>Submission Successful</h4>
                <p>We have sent the FY26 IGL Potable Spirits Division Investor Kit to your email coordinates.</p>
            </div>
        </div>
    </div>

    <!-- Script File -->
    <script src="app.js"></script>
    <?php wp_footer(); ?>
</body>
</html>
