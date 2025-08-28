export default async function serviceHandler(requestFn) {
  try {
    const response = await requestFn();
    return {
      success: true,
      data: response.data.data,
    };
  } catch (err) {
    const errors = err.response?.data?.error?.details?.errors || [err.message];
    return {
      success: false,
      errors,
    };
  }
}
