import React, { useState } from 'react';

export default function CustomerTable({ customers, error, loading, onTssCreated }) {
  const [filter, setFilter] = useState('');
  const filteredCustomers = customers.filter(c =>
    c.last_name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>{error}</p>;

  return (
    <div>
      <input
        placeholder="Filter by Last Name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Customer ID</th>
            <th>TSS IDS</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((c) => (
            <tr key={c.customer_id}>
              <td>{c.first_name}</td>
              <td>{c.last_name}</td>
              <td>{c.mail}</td>
              <td>{c.customer_id}</td>
              <td>
                {Array.isArray(c.tss_ids) &&
                  c.tss_ids.map((id) => (
                    <div key={id}>
                      <span style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        [{id}]
                      </span>
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}