export default function errorHandler (err, req, res, next) {
  console.log("----------", err);
  if (err) {
    res.status(500).send({statusCode: 500, error: err})
  }
}