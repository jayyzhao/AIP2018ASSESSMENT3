USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_PRC_Delete_Menu_Item]    Script Date: 7/10/2018 9:22:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[P_PRC_Delete_Menu_Item] @MENU_ITEM_ID BIGINT
AS
BEGIN

     DELETE FROM MENU_ITEM
	 WHERE MENU_ITEM_ID = @MENU_ITEM_ID

END
GO
