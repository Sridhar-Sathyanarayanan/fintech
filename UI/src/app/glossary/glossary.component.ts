import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../shared/material.standalone';
import { BannerSectionComponent, BannerVisualCard } from '../shared/components';
import { UI_CONSTANTS } from '../models/app.constants';

interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
}

interface CategorySection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModules, BannerSectionComponent],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlossaryComponent implements OnInit {
  glossaryFeatures = [
    {
      icon: 'book',
      label: '100+ Terms',
    },
    {
      icon: 'category',
      label: '8 Categories',
    },
    {
      icon: 'search',
      label: 'Easy Search',
    },
  ];

  visualCards: BannerVisualCard[] = [
    {
      icon: 'menu_book',
      label: 'Total Terms',
      value: '100+'
    },
    {
      icon: 'category',
      label: 'Categories',
      value: '8'
    },
    {
      icon: 'update',
      label: 'Updated',
      value: 'Dec 2025'
    }
  ];

  activeSection: string = '';
  scrollProgress: number = 0;
  searchQuery: string = '';
  filteredTerms: GlossaryTerm[] = [];

  categories: CategorySection[] = [
    { id: 'tax', title: 'Tax & Income', icon: 'receipt_long', description: 'Tax-related terms and concepts' },
    { id: 'investment', title: 'Investments', icon: 'trending_up', description: 'Investment vehicles and strategies' },
    { id: 'loan', title: 'Loans & Credit', icon: 'credit_card', description: 'Loan terms and credit concepts' },
    { id: 'retirement', title: 'Retirement', icon: 'elderly', description: 'Retirement planning and pension terms' },
    { id: 'insurance', title: 'Insurance', icon: 'shield', description: 'Insurance types and coverage terms' },
    { id: 'market', title: 'Market & Trading', icon: 'candlestick_chart', description: 'Stock market and trading terms' },
    { id: 'banking', title: 'Banking', icon: 'account_balance', description: 'Banking and financial services' },
    { id: 'general', title: 'General Finance', icon: 'account_balance_wallet', description: 'General financial concepts' },
  ];

  glossaryTerms: GlossaryTerm[] = [
    // Tax & Income Terms
    {
      id: 'income-tax',
      term: 'Income Tax',
      category: 'tax',
      definition: 'A tax levied by the government on the income earned by individuals and businesses. In India, income tax rates vary based on income slabs and tax regime chosen.',
      example: 'If you earn ₹10 lakhs annually, you pay income tax as per the applicable tax slab rates.',
      relatedTerms: ['Tax Slab', 'TDS', 'ITR']
    },
    {
      id: 'tax-slab',
      term: 'Tax Slab',
      category: 'tax',
      definition: 'Income ranges that determine the applicable tax rate. India has a progressive tax system where higher income brackets pay higher tax rates.',
      example: 'Under the new tax regime (FY 2024-25), income up to ₹3 lakhs is tax-free, ₹3-7 lakhs is taxed at 5%, and so on.',
      relatedTerms: ['Income Tax', 'Tax Exemption']
    },
    {
      id: 'tds',
      term: 'TDS (Tax Deducted at Source)',
      category: 'tax',
      definition: 'A system where tax is collected at the source of income. The payer deducts tax before making payment and deposits it with the government on behalf of the payee.',
      example: 'Your employer deducts TDS from your salary before crediting it to your account.',
      relatedTerms: ['Form 16', 'Form 26AS', 'Income Tax']
    },
    {
      id: 'itr',
      term: 'ITR (Income Tax Return)',
      category: 'tax',
      definition: 'A form used to file information about income earned and taxes paid to the Income Tax Department. Filing ITR is mandatory for individuals whose income exceeds the basic exemption limit.',
      example: 'You must file ITR-1 (Sahaj) if you are a salaried individual with income from salary, one house property, and other sources.',
      relatedTerms: ['Form 16', 'Tax Refund', 'Assessment Year']
    },
    {
      id: 'hra',
      term: 'HRA (House Rent Allowance)',
      category: 'tax',
      definition: 'A component of salary paid by employers to employees for accommodation expenses. HRA exemption can be claimed if you live in a rented house.',
      example: 'If you receive ₹15,000 monthly HRA and pay ₹12,000 rent, you can claim HRA exemption based on prescribed rules.',
      relatedTerms: ['Salary', 'Tax Exemption', 'Form 16']
    },
    {
      id: 'standard-deduction',
      term: 'Standard Deduction',
      category: 'tax',
      definition: 'A flat deduction from gross salary income allowed to salaried individuals and pensioners. For FY 2024-25, the standard deduction is ₹50,000.',
      example: 'If your gross salary is ₹8 lakhs, you can claim ₹50,000 standard deduction, making your taxable salary ₹7.5 lakhs.',
      relatedTerms: ['Salary Income', 'Tax Deduction']
    },
    {
      id: 'section-80c',
      term: 'Section 80C',
      category: 'tax',
      definition: 'A provision under the Income Tax Act that allows deductions up to ₹1.5 lakhs for investments in specified instruments like PPF, ELSS, life insurance, etc. (applicable in old tax regime).',
      example: 'Investing ₹1.5 lakhs in PPF can reduce your taxable income by ₹1.5 lakhs under the old tax regime.',
      relatedTerms: ['PPF', 'ELSS', 'Life Insurance', 'Tax Deduction']
    },
    {
      id: 'section-80d',
      term: 'Section 80D',
      category: 'tax',
      definition: 'Deduction for health insurance premiums paid for self, family, and parents. Maximum deduction of ₹25,000 (₹50,000 for senior citizens) can be claimed.',
      example: 'Paying ₹20,000 health insurance premium allows you to claim ₹20,000 deduction under Section 80D.',
      relatedTerms: ['Health Insurance', 'Tax Deduction']
    },
    {
      id: 'capital-gains',
      term: 'Capital Gains',
      category: 'tax',
      definition: 'Profit earned from the sale of capital assets like stocks, mutual funds, property, etc. Classified as short-term (STCG) or long-term (LTCG) based on holding period.',
      example: 'Selling stocks held for more than 1 year results in Long-Term Capital Gains (LTCG).',
      relatedTerms: ['LTCG', 'STCG', 'Equity', 'Mutual Funds']
    },
    {
      id: 'gst',
      term: 'GST (Goods and Services Tax)',
      category: 'tax',
      definition: 'An indirect tax levied on the supply of goods and services in India. It replaced multiple indirect taxes and has different rates (5%, 12%, 18%, 28%).',
      example: 'When you buy a product for ₹1,000 with 18% GST, you pay ₹1,180 total.',
      relatedTerms: ['Indirect Tax', 'Invoice']
    },

    // Investment Terms
    {
      id: 'sip',
      term: 'SIP (Systematic Investment Plan)',
      category: 'investment',
      definition: 'A method of investing a fixed amount regularly (monthly/quarterly) in mutual funds. It helps in rupee cost averaging and disciplined investing.',
      example: 'Investing ₹5,000 every month in an equity mutual fund through SIP.',
      relatedTerms: ['Mutual Funds', 'Rupee Cost Averaging', 'NAV']
    },
    {
      id: 'mutual-funds',
      term: 'Mutual Funds',
      category: 'investment',
      definition: 'Investment vehicles that pool money from multiple investors to invest in stocks, bonds, or other assets. Managed by professional fund managers.',
      example: 'An equity mutual fund invests primarily in stocks of various companies.',
      relatedTerms: ['SIP', 'NAV', 'Asset Management Company', 'ELSS']
    },
    {
      id: 'nav',
      term: 'NAV (Net Asset Value)',
      category: 'investment',
      definition: 'The per-unit market value of a mutual fund scheme. It is calculated by dividing the total value of all assets minus liabilities by the number of outstanding units.',
      example: 'If a mutual fund has total assets worth ₹100 crores and 1 crore units, the NAV is ₹100 per unit.',
      relatedTerms: ['Mutual Funds', 'SIP']
    },
    {
      id: 'elss',
      term: 'ELSS (Equity Linked Savings Scheme)',
      category: 'investment',
      definition: 'A type of mutual fund that invests primarily in equities and offers tax benefits under Section 80C. Has a lock-in period of 3 years.',
      example: 'Investing ₹1.5 lakhs in ELSS gives you tax deduction and potential equity returns.',
      relatedTerms: ['Section 80C', 'Mutual Funds', 'Lock-in Period']
    },
    {
      id: 'ppf',
      term: 'PPF (Public Provident Fund)',
      category: 'investment',
      definition: 'A government-backed long-term savings scheme with a 15-year maturity period. Offers tax benefits and guaranteed returns (currently 7.1% p.a.).',
      example: 'You can invest up to ₹1.5 lakhs annually in PPF and claim tax deduction under Section 80C.',
      relatedTerms: ['Section 80C', 'Tax-Free Returns', 'Compound Interest']
    },
    {
      id: 'nps',
      term: 'NPS (National Pension System)',
      category: 'investment',
      definition: 'A government-sponsored pension scheme that allows systematic savings during employment with withdrawals post-retirement. Offers tax benefits.',
      example: 'Contributing to NPS Tier-I account offers tax deduction up to ₹1.5 lakhs (80C) + additional ₹50,000 (80CCD(1B)).',
      relatedTerms: ['Retirement Planning', 'Section 80CCD', 'Pension']
    },
    {
      id: 'fd',
      term: 'FD (Fixed Deposit)',
      category: 'investment',
      definition: 'A savings instrument offered by banks where a lump sum is deposited for a fixed tenure at a predetermined interest rate.',
      example: 'Depositing ₹1 lakh for 5 years at 7% p.a. gives you fixed returns.',
      relatedTerms: ['Interest Rate', 'Maturity', 'Bank Account']
    },
    {
      id: 'rd',
      term: 'RD (Recurring Deposit)',
      category: 'investment',
      definition: 'A savings scheme where you deposit a fixed amount regularly (monthly) for a predetermined period and earn interest.',
      example: 'Depositing ₹5,000 every month for 12 months in an RD account.',
      relatedTerms: ['Fixed Deposit', 'Interest Rate', 'Savings']
    },
    {
      id: 'equity',
      term: 'Equity',
      category: 'investment',
      definition: 'Ownership interest in a company, represented by shares of stock. Equity investors are shareholders who own a portion of the company.',
      example: 'Buying 100 shares of a company makes you an equity investor with ownership stake.',
      relatedTerms: ['Shares', 'Stock Market', 'Dividend']
    },
    {
      id: 'bonds',
      term: 'Bonds',
      category: 'investment',
      definition: 'Debt securities issued by governments or corporations where investors lend money in exchange for periodic interest payments and return of principal at maturity.',
      example: 'Government bonds offer fixed returns with lower risk compared to stocks.',
      relatedTerms: ['Fixed Income', 'Coupon Rate', 'Yield']
    },
    {
      id: 'portfolio',
      term: 'Portfolio',
      category: 'investment',
      definition: 'A collection of investments held by an individual or institution, including stocks, bonds, mutual funds, and other assets.',
      example: 'A diversified portfolio might include 60% equity, 30% bonds, and 10% gold.',
      relatedTerms: ['Asset Allocation', 'Diversification', 'Risk Management']
    },
    {
      id: 'diversification',
      term: 'Diversification',
      category: 'investment',
      definition: 'An investment strategy of spreading investments across various assets to reduce risk. "Don\'t put all eggs in one basket."',
      example: 'Investing in stocks, bonds, and real estate instead of only stocks.',
      relatedTerms: ['Portfolio', 'Asset Allocation', 'Risk Management']
    },

    // Loan & Credit Terms
    {
      id: 'emi',
      term: 'EMI (Equated Monthly Installment)',
      category: 'loan',
      definition: 'A fixed payment amount made by a borrower to a lender at a specified date each month. EMI includes both principal and interest components.',
      example: 'For a ₹10 lakh home loan at 8% for 20 years, your EMI would be approximately ₹8,364.',
      relatedTerms: ['Principal', 'Interest Rate', 'Loan Tenure']
    },
    {
      id: 'principal',
      term: 'Principal',
      category: 'loan',
      definition: 'The original amount of money borrowed in a loan or invested, excluding interest or returns.',
      example: 'If you take a ₹5 lakh loan, ₹5 lakh is the principal amount.',
      relatedTerms: ['EMI', 'Interest', 'Loan Amount']
    },
    {
      id: 'interest-rate',
      term: 'Interest Rate',
      category: 'loan',
      definition: 'The percentage charged on the principal by the lender for the use of money. Can be simple or compound interest.',
      example: 'A home loan at 8% p.a. interest rate means you pay 8% of the outstanding amount annually.',
      relatedTerms: ['EMI', 'APR', 'Simple Interest', 'Compound Interest']
    },
    {
      id: 'apr',
      term: 'APR (Annual Percentage Rate)',
      category: 'loan',
      definition: 'The yearly interest rate charged on a loan or earned on an investment, including fees and other costs.',
      example: 'A credit card with 36% APR charges 3% interest per month.',
      relatedTerms: ['Interest Rate', 'Credit Card', 'Loan']
    },
    {
      id: 'credit-score',
      term: 'Credit Score',
      category: 'loan',
      definition: 'A numerical representation (300-900 in India) of an individual\'s creditworthiness based on credit history. Higher scores indicate better creditworthiness.',
      example: 'A CIBIL score above 750 is considered good for loan approvals.',
      relatedTerms: ['CIBIL', 'Credit Report', 'Creditworthiness']
    },
    {
      id: 'cibil',
      term: 'CIBIL',
      category: 'loan',
      definition: 'Credit Information Bureau (India) Limited - India\'s premier credit information company. CIBIL score is widely used by lenders to assess creditworthiness.',
      example: 'Banks check your CIBIL score before approving a home loan.',
      relatedTerms: ['Credit Score', 'Credit Report', 'Loan Approval']
    },
    {
      id: 'collateral',
      term: 'Collateral',
      category: 'loan',
      definition: 'An asset pledged by a borrower to secure a loan. If the borrower defaults, the lender can seize the collateral.',
      example: 'In a home loan, the property itself serves as collateral.',
      relatedTerms: ['Secured Loan', 'Mortgage', 'Loan']
    },
    {
      id: 'foreclosure',
      term: 'Foreclosure',
      category: 'loan',
      definition: 'The process of paying off the entire outstanding loan amount before the end of the loan tenure. May involve prepayment charges.',
      example: 'Foreclosing a personal loan after 2 years by paying the full outstanding amount.',
      relatedTerms: ['Prepayment', 'Loan Closure', 'Outstanding Amount']
    },
    {
      id: 'debt-to-income',
      term: 'Debt-to-Income Ratio',
      category: 'loan',
      definition: 'The percentage of monthly gross income that goes toward paying debts. Used by lenders to assess borrowing capacity.',
      example: 'If your monthly income is ₹1 lakh and EMIs are ₹30,000, your DTI ratio is 30%.',
      relatedTerms: ['EMI', 'Loan Eligibility', 'Income']
    },

    // Retirement Terms
    {
      id: 'gratuity',
      term: 'Gratuity',
      category: 'retirement',
      definition: 'A lump sum payment made by an employer to an employee at retirement or resignation after completing 5 years of continuous service.',
      example: 'After 20 years of service with last drawn salary of ₹80,000, gratuity would be approximately ₹12.3 lakhs.',
      relatedTerms: ['Retirement Benefits', 'Provident Fund', 'Pension']
    },
    {
      id: 'provident-fund',
      term: 'Provident Fund (PF)',
      category: 'retirement',
      definition: 'A retirement savings scheme where both employee and employer contribute a percentage of salary. Managed by EPFO (Employees\' Provident Fund Organisation).',
      example: '12% of your basic salary is deducted for PF contribution, matched by employer\'s 12%.',
      relatedTerms: ['EPF', 'Retirement', 'EPS']
    },
    {
      id: 'epf',
      term: 'EPF (Employees\' Provident Fund)',
      category: 'retirement',
      definition: 'A retirement savings scheme managed by EPFO where employees contribute 12% of basic salary, matched by employer, earning interest (currently 8.25%).',
      example: 'Your EPF balance accumulates over your career and can be withdrawn at retirement.',
      relatedTerms: ['Provident Fund', 'UAN', 'Retirement']
    },
    {
      id: 'eps',
      term: 'EPS (Employees\' Pension Scheme)',
      category: 'retirement',
      definition: 'A social security scheme by EPFO providing monthly pension to employees after retirement (at age 58) with at least 10 years of service.',
      example: 'Part of employer\'s PF contribution goes to EPS for your pension.',
      relatedTerms: ['EPF', 'Pension', 'Retirement']
    },
    {
      id: 'annuity',
      term: 'Annuity',
      category: 'retirement',
      definition: 'A series of regular payments made at equal intervals, typically purchased as a retirement income product from insurance companies.',
      example: 'Investing ₹50 lakhs in an annuity plan to receive ₹30,000 monthly pension for life.',
      relatedTerms: ['Pension', 'Retirement Planning', 'Income']
    },
    {
      id: 'pension',
      term: 'Pension',
      category: 'retirement',
      definition: 'A regular payment made to a person during retirement from an investment fund or government program they contributed to during their working life.',
      example: 'Government employees receive monthly pension after retirement.',
      relatedTerms: ['NPS', 'EPS', 'Annuity', 'Retirement']
    },
    {
      id: 'retirement-corpus',
      term: 'Retirement Corpus',
      category: 'retirement',
      definition: 'The total amount of money accumulated for retirement through various savings and investments to sustain lifestyle after retirement.',
      example: 'Building a retirement corpus of ₹2 crores through SIPs, NPS, and PPF over 30 years.',
      relatedTerms: ['Retirement Planning', 'Financial Independence', 'Corpus']
    },

    // Insurance Terms
    {
      id: 'term-insurance',
      term: 'Term Insurance',
      category: 'insurance',
      definition: 'A pure life insurance policy that provides coverage for a specific term. Pays death benefit only if the insured dies during the term.',
      example: 'A ₹1 crore term insurance for 30 years costs around ₹12,000 annually for a 30-year-old.',
      relatedTerms: ['Life Insurance', 'Sum Assured', 'Premium']
    },
    {
      id: 'premium',
      term: 'Premium',
      category: 'insurance',
      definition: 'The amount paid periodically (monthly/annually) to keep an insurance policy active. Premium depends on coverage, age, and risk factors.',
      example: 'Paying ₹15,000 annual premium for a health insurance policy with ₹5 lakh coverage.',
      relatedTerms: ['Insurance', 'Policy', 'Sum Assured']
    },
    {
      id: 'sum-assured',
      term: 'Sum Assured',
      category: 'insurance',
      definition: 'The guaranteed amount that an insurance company pays to the beneficiary upon the occurrence of the insured event (death, maturity, etc.).',
      example: 'In a term insurance with ₹50 lakh sum assured, beneficiaries receive ₹50 lakhs on death of insured.',
      relatedTerms: ['Insurance', 'Premium', 'Coverage']
    },
    {
      id: 'health-insurance',
      term: 'Health Insurance',
      category: 'insurance',
      definition: 'Insurance coverage that pays for medical and surgical expenses. Can cover hospitalization, day care, pre and post hospitalization expenses.',
      example: 'A family floater health insurance of ₹10 lakhs covers all family members.',
      relatedTerms: ['Premium', 'Claim', 'Cashless Treatment']
    },
    {
      id: 'claim',
      term: 'Claim',
      category: 'insurance',
      definition: 'A formal request made to an insurance company for payment of benefits as per the policy terms.',
      example: 'Filing a health insurance claim for ₹2 lakhs hospital bill.',
      relatedTerms: ['Insurance', 'Settlement', 'Policy']
    },
    {
      id: 'deductible',
      term: 'Deductible',
      category: 'insurance',
      definition: 'The amount you must pay out-of-pocket before the insurance company pays the remaining amount. Common in health insurance.',
      example: 'With a ₹50,000 deductible, you pay the first ₹50,000 of medical expenses.',
      relatedTerms: ['Health Insurance', 'Co-payment', 'Premium']
    },

    // Market & Trading Terms
    {
      id: 'nifty',
      term: 'Nifty 50',
      category: 'market',
      definition: 'The benchmark stock market index in India comprising 50 of the largest companies listed on the National Stock Exchange (NSE).',
      example: 'When Nifty crosses 20,000, it indicates strong market performance.',
      relatedTerms: ['Sensex', 'Stock Market', 'Index']
    },
    {
      id: 'sensex',
      term: 'Sensex',
      category: 'market',
      definition: 'The benchmark index of the Bombay Stock Exchange (BSE), comprising 30 of the largest and most actively traded stocks.',
      example: 'Sensex reaching 65,000 points indicates market growth.',
      relatedTerms: ['Nifty', 'Stock Market', 'BSE']
    },
    {
      id: 'demat',
      term: 'Demat Account',
      category: 'market',
      definition: 'A dematerialized account that holds shares and securities in electronic form. Required for trading in stock markets.',
      example: 'Opening a demat account with a broker to buy and sell shares online.',
      relatedTerms: ['Trading Account', 'Shares', 'Stock Market']
    },
    {
      id: 'ipo',
      term: 'IPO (Initial Public Offering)',
      category: 'market',
      definition: 'The first sale of stock by a private company to the public. Companies go public to raise capital for expansion.',
      example: 'Applying for an IPO when a company offers shares to public investors for the first time.',
      relatedTerms: ['Stock Market', 'Shares', 'Listing']
    },
    {
      id: 'dividend',
      term: 'Dividend',
      category: 'market',
      definition: 'A portion of a company\'s profits distributed to shareholders. Can be paid in cash or additional shares.',
      example: 'A company declaring ₹5 dividend per share means you receive ₹5 for each share you own.',
      relatedTerms: ['Shares', 'Equity', 'Dividend Yield']
    },
    {
      id: 'bull-market',
      term: 'Bull Market',
      category: 'market',
      definition: 'A market condition where stock prices are rising or expected to rise, typically by 20% or more. Characterized by investor optimism.',
      example: 'The market was in a bull phase when Nifty rose from 15,000 to 20,000.',
      relatedTerms: ['Bear Market', 'Market Trend', 'Stock Market']
    },
    {
      id: 'bear-market',
      term: 'Bear Market',
      category: 'market',
      definition: 'A market condition where stock prices are falling or expected to fall, typically by 20% or more. Characterized by pessimism.',
      example: 'During the 2020 COVID crash, markets entered a bear phase.',
      relatedTerms: ['Bull Market', 'Market Correction', 'Stock Market']
    },
    {
      id: 'market-cap',
      term: 'Market Capitalization',
      category: 'market',
      definition: 'The total market value of a company\'s outstanding shares, calculated by multiplying share price by total shares.',
      example: 'A company with 1 crore shares at ₹500 each has a market cap of ₹500 crores.',
      relatedTerms: ['Large Cap', 'Mid Cap', 'Small Cap']
    },
    {
      id: 'volatility',
      term: 'Volatility',
      category: 'market',
      definition: 'The degree of variation in the price of a financial instrument over time. Higher volatility means higher risk and potential returns.',
      example: 'Small-cap stocks typically have higher volatility than large-cap stocks.',
      relatedTerms: ['Risk', 'Market Fluctuation', 'Beta']
    },

    // Banking Terms
    {
      id: 'savings-account',
      term: 'Savings Account',
      category: 'banking',
      definition: 'A basic bank account that pays interest on deposits. Meant for saving money while maintaining liquidity for daily transactions.',
      example: 'Opening a savings account that offers 3-4% annual interest on balance.',
      relatedTerms: ['Current Account', 'Interest', 'Bank']
    },
    {
      id: 'current-account',
      term: 'Current Account',
      category: 'banking',
      definition: 'A bank account primarily for businesses with unlimited transactions but typically no interest earnings. Suitable for frequent transactions.',
      example: 'Businesses use current accounts for daily payment and receipt transactions.',
      relatedTerms: ['Savings Account', 'Bank Account', 'Overdraft']
    },
    {
      id: 'neft',
      term: 'NEFT (National Electronic Funds Transfer)',
      category: 'banking',
      definition: 'An electronic funds transfer system in India for transferring money between bank accounts. Available 24x7 with settlement in batches.',
      example: 'Transferring ₹10,000 from your account to another bank using NEFT.',
      relatedTerms: ['RTGS', 'IMPS', 'UPI', 'Bank Transfer']
    },
    {
      id: 'rtgs',
      term: 'RTGS (Real Time Gross Settlement)',
      category: 'banking',
      definition: 'A real-time funds transfer system for large amounts (minimum ₹2 lakhs). Transfer is instant and on a continuous basis.',
      example: 'Using RTGS for transferring ₹5 lakhs for a property transaction.',
      relatedTerms: ['NEFT', 'IMPS', 'Bank Transfer']
    },
    {
      id: 'upi',
      term: 'UPI (Unified Payments Interface)',
      category: 'banking',
      definition: 'An instant real-time payment system enabling inter-bank transactions through mobile. Transfer money using mobile number, VPA, or QR code.',
      example: 'Paying for groceries by scanning a QR code using Google Pay or PhonePe (UPI apps).',
      relatedTerms: ['Digital Payment', 'Bank Transfer', 'Mobile Banking']
    },
    {
      id: 'ifsc',
      term: 'IFSC Code',
      category: 'banking',
      definition: 'Indian Financial System Code - An 11-digit alphanumeric code that identifies each bank branch participating in NEFT, RTGS, and IMPS.',
      example: 'SBIN0001234 is an example IFSC code where SBIN represents State Bank of India.',
      relatedTerms: ['NEFT', 'RTGS', 'Bank Branch']
    },
    {
      id: 'kyc',
      term: 'KYC (Know Your Customer)',
      category: 'banking',
      definition: 'A process of verifying customer identity and address through documents like Aadhaar, PAN, passport. Mandatory for financial services.',
      example: 'Submitting Aadhaar and PAN for KYC verification when opening a bank account.',
      relatedTerms: ['Bank Account', 'Identity Verification', 'Compliance']
    },
    {
      id: 'overdraft',
      term: 'Overdraft',
      category: 'banking',
      definition: 'A banking facility that allows you to withdraw more money than available in your account, up to a pre-approved limit.',
      example: 'Having a ₹50,000 overdraft facility on your current account for emergency cash flow.',
      relatedTerms: ['Current Account', 'Credit Facility', 'Interest']
    },

    // General Finance Terms
    {
      id: 'inflation',
      term: 'Inflation',
      category: 'general',
      definition: 'The rate at which the general level of prices for goods and services rises, eroding purchasing power. Measured by CPI and WPI.',
      example: 'With 6% inflation, what costs ₹100 today will cost ₹106 next year.',
      relatedTerms: ['CPI', 'Purchasing Power', 'Real Returns']
    },
    {
      id: 'compound-interest',
      term: 'Compound Interest',
      category: 'general',
      definition: 'Interest calculated on the initial principal and accumulated interest from previous periods. "Interest on interest."',
      example: '₹1 lakh at 10% compound interest annually becomes ₹1.61 lakhs in 5 years.',
      relatedTerms: ['Simple Interest', 'Returns', 'Investment']
    },
    {
      id: 'liquidity',
      term: 'Liquidity',
      category: 'general',
      definition: 'How quickly an asset can be converted to cash without significantly affecting its price. Cash is most liquid.',
      example: 'Stocks are more liquid than real estate as they can be sold quickly.',
      relatedTerms: ['Cash', 'Asset', 'Emergency Fund']
    },
    {
      id: 'asset',
      term: 'Asset',
      category: 'general',
      definition: 'Anything of value owned that can generate income or appreciate. Includes property, stocks, bonds, gold, business, etc.',
      example: 'Your house, car, investments, and savings are all assets.',
      relatedTerms: ['Liability', 'Net Worth', 'Portfolio']
    },
    {
      id: 'liability',
      term: 'Liability',
      category: 'general',
      definition: 'Financial obligations or debts owed to others. Includes loans, credit card debt, mortgages, etc.',
      example: 'Your home loan of ₹50 lakhs is a liability.',
      relatedTerms: ['Asset', 'Debt', 'Net Worth']
    },
    {
      id: 'net-worth',
      term: 'Net Worth',
      category: 'general',
      definition: 'The total value of assets minus liabilities. A measure of financial health and wealth.',
      example: 'If you have assets worth ₹80 lakhs and liabilities of ₹20 lakhs, your net worth is ₹60 lakhs.',
      relatedTerms: ['Asset', 'Liability', 'Wealth']
    },
    {
      id: 'emergency-fund',
      term: 'Emergency Fund',
      category: 'general',
      definition: 'Savings kept aside for unexpected expenses or financial emergencies. Typically 6-12 months of expenses in highly liquid form.',
      example: 'Maintaining ₹3 lakhs in savings account as emergency fund for job loss or medical emergencies.',
      relatedTerms: ['Liquidity', 'Savings', 'Financial Planning']
    },
    {
      id: 'budget',
      term: 'Budget',
      category: 'general',
      definition: 'A financial plan that estimates income and expenses over a specific period. Helps in controlling spending and saving.',
      example: 'Creating a monthly budget allocating 50% for needs, 30% for wants, and 20% for savings.',
      relatedTerms: ['Income', 'Expenses', 'Financial Planning']
    },
    {
      id: 'roi',
      term: 'ROI (Return on Investment)',
      category: 'general',
      definition: 'A measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100. Expressed as percentage.',
      example: 'Investing ₹1 lakh and getting ₹1.2 lakhs back gives 20% ROI.',
      relatedTerms: ['Returns', 'Investment', 'Profit']
    },
    {
      id: 'risk-appetite',
      term: 'Risk Appetite',
      category: 'general',
      definition: 'The level of risk an investor is willing and able to take in their investments. Varies based on age, income, goals.',
      example: 'Young investors typically have higher risk appetite and can invest more in equities.',
      relatedTerms: ['Risk Tolerance', 'Investment Strategy', 'Portfolio']
    },
    {
      id: 'financial-planning',
      term: 'Financial Planning',
      category: 'general',
      definition: 'The process of managing money to achieve life goals through proper management of finances including budgeting, investing, and risk management.',
      example: 'Creating a financial plan for retirement, child\'s education, and wealth creation.',
      relatedTerms: ['Budget', 'Investment', 'Goals']
    },
  ];

  ngOnInit(): void {
    this.updateScrollPosition();
    this.filteredTerms = [...this.glossaryTerms];
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateScrollPosition();
  }

  updateScrollPosition(): void {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = (window.scrollY / totalHeight) * 100;

    const sections = document.querySelectorAll('.category-section');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        this.activeSection = section.id;
      }
    });
  }

  scrollToCategory(categoryId: string): void {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = UI_CONSTANTS.SCROLL_OFFSET;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  isActiveCategory(categoryId: string): boolean {
    return this.activeSection === categoryId;
  }

  getTermsByCategory(categoryId: string): GlossaryTerm[] {
    return this.filteredTerms.filter(term => term.category === categoryId);
  }

  getCategoryCount(categoryId: string): number {
    return this.glossaryTerms.filter(term => term.category === categoryId).length;
  }

  onSearchChange(query: string): void {
    this.searchQuery = query.toLowerCase();
    if (this.searchQuery) {
      this.filteredTerms = this.glossaryTerms.filter(term => 
        term.term.toLowerCase().includes(this.searchQuery) ||
        term.definition.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredTerms = [...this.glossaryTerms];
    }
  }
}
