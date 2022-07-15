// async function fetchPost(payload: []): Promise<void> {
//   const response = await fetch('http://localhost:3000/api/breweries', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     const data = await response.json();

//     return Promise.reject({ status: response.status, data });
//   }

//   // API returns no data on 204.
//   return Promise.resolve();
// }

// export default fetchPost;

//place holder so typescript doesn't give me errors during build
export {};
