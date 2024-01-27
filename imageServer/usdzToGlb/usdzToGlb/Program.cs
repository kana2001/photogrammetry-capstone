// See https://aka.ms/new-console-template for more information
// https://chat.openai.com/share/92d9de25-caac-452e-88ef-6a92406310da

using System;

class Program
{
    static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Console.WriteLine("Please provide a file path.");
            return;
        }

        string filePath = args[0];
        string outputFilePath = GetOutputFilePath(filePath, ".glb");
        
        // Initialize an object of Scene class
        Aspose.ThreeD.Scene scene = new Aspose.ThreeD.Scene();
        scene.Open(filePath);
        
        // Save output GLB file
        scene.Save(outputFilePath);

        Console.WriteLine("Conversion from .usdz to .glb is complete"); 
    }

    static string GetOutputFilePath(string inputFilePath, string newExtension)
    {
        string directory = Path.GetDirectoryName(inputFilePath);
        string fileName = Path.GetFileNameWithoutExtension(inputFilePath);
        return Path.Combine(directory, fileName + newExtension);
    }
}
