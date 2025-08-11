import React from 'react';

const CompanyList = () => {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const retailCompanies = companies
    .filter(company => company.category === "Retail")
    .map(company => ({ ...company, start: company.start + 1 }));

  return (
    <div style={{ 
      margin: '20px 0',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h2 style={{ color: '#333' }}>Retail Companies</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {retailCompanies.map((company, index) => (
          <div 
            key={index}
            style={{
              padding: '15px',
              border: '1px solid #eee',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <p><strong>Name:</strong> {company.name}</p>
            <p><strong>Category:</strong> {company.category}</p>
            <p><strong>Start:</strong> {company.start}</p>
            <p><strong>End:</strong> {company.end}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;