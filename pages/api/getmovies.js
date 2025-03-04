import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

export default async function handle(req, res) {
    const { method } = req;

    // Connect to MongoDB database
    await mongooseConnect();

    // Prevent caching of the response
    res.setHeader('Cache-Control', 'no-store'); // This will ensure the response is not cached

    // Handle GET request for movie data
    if (method === "GET") {
        try {
            if (req.query?.id) {
                // Fetch a single movie by ID
                const movie = await Movie.findById(req.query.id); // Corrected method
                if (!movie) return res.status(404).json({ message: "Movie not found" });
                return res.json(movie);
            } 
            
            if (req.query?.title) {
                // Fetch movies by title (search)
                const title = await Movie.find({ title: new RegExp(req.query.title, 'i') }); // Case-insensitive search
                return res.json(title);
            } 
            
            if (req.query?.titlecategory) {
                // Fetch movies by title category
                const titlecategory = await Movie.find({ titlecategory: req.query.titlecategory });
                return res.json(titlecategory.reverse()); // Reverse for showing latest data
            } 
            
            if (req.query?.genre) {
                // Fetch movie by genre
                const genre = await Movie.find({ genre: req.query.genre });
                return res.json(genre.reverse()); // Reverse for showing latest data
            } 
            
            if (req.query?.category) {
                // Fetch movie by category
                const category = await Movie.find({ category: req.query.category });
                return res.json(category.reverse()); // Reverse for showing latest data
            } 
            
            if (req.query?.slug) {
                // Fetch movie by slug
                const slug = await Movie.find({ slug: req.query.slug });
                if (!slug.length) return res.status(404).json({ message: "Movie not found" });
                return res.json(slug.reverse()); // Reverse for showing latest data
            }

            // Fetch all movies
            const movies = await Movie.find();
            return res.json(movies.reverse()); // Reverse for showing latest data

        } catch (error) {
            // Handle errors
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }

    } else {
        // Method not allowed
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
