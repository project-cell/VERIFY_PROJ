export const test=(req,res)=>{
    
        console.log('Received request to /');
    try {
      res.json({
        message: 'Welcome to the API .This is user.routes.....HURRAY!!......',
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

};