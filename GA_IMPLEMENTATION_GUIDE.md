# Google Analytics 4 Implementation Guide

## Overview
Google Analytics 4 has been successfully integrated into the Geppetto website with GDPR-compliant cookie consent management.

## Features Implemented

### 1. Google Analytics 4 Integration
- **Component**: `src/components/analytics/GoogleAnalytics.astro`
- **Environment Variable**: `PUBLIC_GA_MEASUREMENT_ID`
- **Privacy-first**: Starts with consent denied, only activates after user consent

### 2. GDPR Cookie Consent Banner
- **Component**: `src/components/analytics/CookieConsent.astro`
- **Features**:
  - Multi-language support (EN/ZH)
  - Granular consent categories (Essential, Analytics, Marketing)
  - Persistent storage of user preferences
  - GDPR compliant consent management

### 3. Enhanced Tracking Capabilities
- **B2B Custom Dimensions**:
  - `dimension1`: user_type (visitor, lead, customer)
  - `dimension2`: traffic_source (organic, direct, referral)
  - `dimension3`: page_language (zh, en)

- **Custom Events**:
  - Quote requests (`trackQuoteRequest`)
  - File uploads (`trackFileUpload`)
  - Contact form submissions (`trackContactForm`)

## Setup Instructions

### 1. Get Google Analytics Measurement ID
1. Create a new GA4 property at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)

### 2. Configure Environment Variables
Create `.env` file with:
```bash
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_GA_ENABLE_DEV=false
PUBLIC_COOKIE_CONSENT_ENABLED=true
```

### 3. Enable Cookie Consent (Optional)
Set `PUBLIC_COOKIE_CONSENT_ENABLED=true` to show cookie consent banner.

## Testing

### Development Mode
- Analytics is disabled by default in development
- Set `PUBLIC_GA_ENABLE_DEV=true` to test in development
- Mock functions log to console when GA is disabled

### Production Testing
1. Build: `npm run build`
2. Preview: `npm run preview`
3. Check GA Real-Time reports in Google Analytics dashboard

## Custom Event Usage

### Track Quote Requests
```javascript
window.trackQuoteRequest({
  quoteId: 'Q123456',
  estimatedValue: 500
});
```

### Track File Uploads
```javascript
window.trackFileUpload({
  fileType: 'CAD',
  fileSize: 1024
});
```

### Track Contact Forms
```javascript
window.trackContactForm('general_inquiry');
```

## Cookie Consent Management

### User Experience
1. Banner appears on first visit
2. User can Accept All, Decline, or customize Settings
3. Preferences are stored and respected across sessions
4. Analytics only works with user consent

### Developer API
```javascript
// Get current consent status
const consent = window.getCookieConsent();

// Listen for consent changes
window.addEventListener('cookieConsentChanged', (e) => {
  console.log('Consent updated:', e.detail);
});
```

## Privacy Features

### Data Protection
- IP anonymization enabled
- Google Signals disabled
- Ad personalization disabled
- Consent-first approach

### GDPR Compliance
- Explicit consent required
- Granular control options
- Easy opt-out mechanism
- Consent withdrawal supported

## Files Modified/Created

### New Files
- `src/components/analytics/GoogleAnalytics.astro`
- `src/components/analytics/CookieConsent.astro`

### Modified Files
- `src/layouts/BaseLayout.astro` - Added analytics and cookie consent
- `.env.example` - Added GA configuration variables

## Next Steps

1. **Set up GA4 property** and get Measurement ID
2. **Configure environment variables** in production
3. **Test analytics** in staging environment
4. **Set up Goals and Conversions** in GA4 dashboard
5. **Configure custom dimensions** in GA4 property settings

## Monitoring

- Monitor Real-Time users in GA4
- Check console for tracking events
- Verify cookie consent functionality
- Test cross-language tracking

---

**Note**: Remember to update your Privacy Policy to reflect the use of Google Analytics and cookie tracking.