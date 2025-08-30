import { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Textarea } from "@/components/common/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/common/ui/avatar";
import { Star, MessageCircle, Send, ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react";
import { Badge } from "@/components/common/ui/badge";
import type { Comment as ProductComment } from "@shared/SchemaProduct";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
  // Propiedades extendidas para comentarios del producto
  product_id?: number;
  created_at?: string;
  is_verified_purchase?: boolean;
}

interface ProductCommentsProps {
  productId: string;
  productName: string;
  mockComments?: ProductComment[];
}

export function ProductComments({ productId, productName, mockComments }: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Convertir comentarios del producto a formato interno
  const productComments: Comment[] = mockComments ? mockComments.map(comment => ({
    id: comment.id.toString(),
    author: comment.user_name,
    avatar: comment.user_avatar || undefined,
    rating: comment.rating,
    content: comment.comment,
    date: new Date(comment.created_at).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    likes: comment.helpful_votes,
    dislikes: 0,
    // Agregar información adicional del comentario del producto como propiedades extendidas
    product_id: comment.product_id,
    created_at: comment.created_at,
    is_verified_purchase: comment.is_verified_purchase,
  })) : [];

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Usuario Actual",
      rating,
      content: newComment,
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      likes: 0,
      dislikes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setRating(5);
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: "Usuario Actual",
      rating: 5,
      content: replyContent,
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      likes: 0,
      dislikes: 0,
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyContent("");
    setShowReplyForm(null);
  };

  const handleLike = (commentId: string, isLike: boolean) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: isLike ? comment.likes + 1 : comment.likes,
          dislikes: !isLike ? comment.dislikes + 1 : comment.dislikes,
        };
      }
      return comment;
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <Card key={comment.id} className={isReply ? "ml-8 border-l-2 border-blue-200" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-slate-900">{comment.author}</span>
              
              {/* Badge de compra verificada si está disponible */}
              {comment.is_verified_purchase && (
                <Badge variant="outline" className="flex items-center gap-1 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Compra Verificada
                </Badge>
              )}
              
              <div className="flex items-center gap-1">
                {renderStars(comment.rating)}
              </div>
              <span className="text-sm text-slate-500">{comment.date}</span>
            </div>
            
            <p className="text-slate-700 mb-3">{comment.content}</p>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id, true)}
                className="flex items-center gap-1 text-slate-600 hover:text-green-600"
              >
                <ThumbsUp className="h-4 w-4" />
                {comment.likes}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(comment.id, false)}
                className="flex items-center gap-1 text-slate-600 hover:text-red-600"
              >
                <ThumbsDown className="h-4 w-4" />
                {comment.dislikes}
              </Button>
              
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Responder
                </Button>
              )}
            </div>
            
            {/* Formulario de respuesta */}
            {showReplyForm === comment.id && !isReply && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <Textarea
                  placeholder="Escribe tu respuesta..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Responder
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReplyForm(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
            
            {/* Respuestas */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 space-y-3">
                {comment.replies.map(reply => renderComment(reply, true))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            Comentarios y Reseñas
            {mockComments && mockComments.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {mockComments.length} comentarios
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulario para nuevo comentario */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-3">Deja tu comentario</h4>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-slate-600">Calificación:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-5 w-5 cursor-pointer ${
                        i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <Textarea
              placeholder={`Comparte tu experiencia con ${productName}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
              rows={3}
            />
            
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar Comentario
            </Button>
          </div>

          {/* Lista de comentarios */}
          <div className="space-y-4">
            {productComments.length > 0 ? (
              productComments.map(comment => renderComment(comment))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


