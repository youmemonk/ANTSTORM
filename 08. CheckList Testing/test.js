for (var i = 0; i < 10; i++)
{
    try
    {
        if (i == 2 || i == 4)
        {
            throw "message";
        }
    }
    catch (ex)
    {
        // errorLog.AppendLine(ex.Message);
        console.log(ex)
    }
}