// export const ctrlWrapper = ctrl => {
//   const func =  async (req, res, next) => {
//     try {
//       await ctrl(req, res, next);
//     }
//     catch (error) {
//       next(error);
//     }
//     };
//     return func;
// };
// export default ctrlWrapper;

// export const ctrlWrapper = (controller) => {
//   return async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };

export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};